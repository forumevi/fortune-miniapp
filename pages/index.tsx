import React, { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { ethers } from "ethers";
// Farcaster Mini App (Frame) SDK
import sdk from "@farcaster/frame-sdk";

export default function Home() {
  const [fortune, setFortune] = useState("🔮 Click to reveal your fortune!");
  const [walletConnected, setWalletConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  // sdk.actions.ready() — splash’ı kapatır, “Ready not called” uyarısını çözer
  useEffect(() => {
    // SDK bazı ortamlarda senkron yükleniyor; hazır olduğunda ready çağrısı yap
    try {
      sdk.actions.ready();
    } catch (e) {
      // Burada sessiz kalıyoruz; embed dışında normal web’de sdk olmayabilir
      // console.debug("sdk ready skipped", e);
    }
  }, []);

  // EIP-1193 provider’ını seç: önce Farcaster içi provider, yoksa window.ethereum
  const eip1193 = useMemo<any>(() => {
    // Farcaster Mini App içi EVM provider:
    // sdk.wallet?.ethProvider (EIP-1193 arayüzü döner)
    const fc = (sdk as any)?.wallet?.ethProvider;
    if (fc) return fc;
    if (typeof window !== "undefined" && (window as any).ethereum) {
      return (window as any).ethereum;
    }
    return null;
  }, []);

  const fortunes = [
    "✨ Great opportunities await you!",
    "🍀 Luck favors you — take the leap!",
    "🌞 Today’s energy will bring you joy.",
    "🌙 Trust your intuition; it won’t fail you.",
    "🔥 Passion drives success today.",
  ];

  // Cüzdan bağla (Farcaster içi: sdk.wallet.ethProvider, normal web: window.ethereum)
  const connectWallet = async () => {
    try {
      if (!eip1193) {
        alert("No wallet detected. Open in Farcaster or install a wallet (e.g., MetaMask)!");
        return;
      }

      // Hesap iste
      const accounts: string[] = await eip1193.request({
        method: "eth_requestAccounts",
      });

      if (accounts && accounts.length > 0) {
        setAddress(accounts[0]);
        setWalletConnected(true);
        // Base chain’e geçirme (isteğe bağlı; Base chainId: 0x2105 = 8453)
        try {
          await eip1193.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x2105" }],
          });
        } catch {
          // ağ ekleme gerekirse buraya ekleyebilirsin
        }
        alert("Wallet connected successfully!");
      } else {
        alert("No account returned from wallet.");
      }
    } catch (err) {
      console.error("connectWallet error:", err);
      alert("Failed to connect wallet.");
    }
  };

  // Yazma işlemi (demo amaçlı data alanına fortune basıyoruz)
  const saveToBlockchain = async (fortuneText: string) => {
    try {
      if (!eip1193) return;

      // ethers v6 — EIP-1193 provider’ı sar
      const provider = new ethers.BrowserProvider(eip1193 as any);
      const signer = await provider.getSigner();

      const tx = await signer.sendTransaction({
        to: "0x0000000000000000000000000000000000000000", // demo
        value: 0n,
        data: ethers.hexlify(ethers.toUtf8Bytes(fortuneText)),
      });

      console.log("Transaction sent:", tx);
    } catch (err) {
      console.error("saveToBlockchain error:", err);
    }
  };

  const revealFortune = () => {
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    setFortune(randomFortune);
    // Cüzdan bağlıysa yazmayı dener
    if (walletConnected) saveToBlockchain(randomFortune);
  };

  return (
    <>
      <Head>
        <title>Fortune Teller 🔮</title>
        <meta name="description" content="Reveal your daily fortune and share it on Farcaster!" />

        {/* OG / Twitter meta */}
        <meta property="og:title" content="Fortune Teller 🔮" />
        <meta property="og:description" content="Reveal your daily fortune and share it on Farcaster!" />
        <meta property="og:image" content="https://fortune-miniapp-six.vercel.app/icon.png" />
        <meta property="og:url" content="https://fortune-miniapp-six.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(to bottom right, #6b46c1, #b794f4)",
          color: "white",
          textAlign: "center",
          fontFamily: "sans-serif",
          padding: "1rem",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Fortune Teller 🔮</h1>
        <p style={{ fontSize: "0.9rem", opacity: 0.9, marginBottom: "1rem" }}>
          {address ? `Connected: ${address.slice(0, 6)}…${address.slice(-4)}` : "Not connected"}
        </p>
        <p style={{ fontSize: "1.25rem", marginBottom: "2rem" }}>{fortune}</p>

        {!walletConnected ? (
          <button
            onClick={connectWallet}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#fff",
              color: "#6b46c1",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Connect Wallet
          </button>
        ) : (
          <button
            onClick={revealFortune}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#fff",
              color: "#6b46c1",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Reveal Fortune
          </button>
        )}
      </div>
    </>
  );
}
