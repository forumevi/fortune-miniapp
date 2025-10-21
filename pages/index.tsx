// pages/index.tsx
import React, { useState } from "react";
import Head from "next/head";
import { ethers } from "ethers";

export default function Home() {
  const [fortune, setFortune] = useState("🔮 Click to reveal your fortune!");
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const fortunes = [
    "✨ Great opportunities await you!",
    "🍀 Luck favors you — take the leap!",
    "🌞 Today’s energy will bring you joy.",
    "🌙 Trust your intuition; it won’t fail you.",
    "🔥 Passion drives success today."
  ];

  const connectWallet = async () => {
    try {
      if (typeof window !== "undefined" && (window as any).ethereum) {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        // request accounts through provider (this will prompt wallet)
        await (window as any).ethereum.request({ method: "eth_requestAccounts" });
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWalletConnected(true);
        setWalletAddress(address);
        alert("Wallet connected: " + address);
      } else {
        alert("No wallet detected. Please install MetaMask or Base wallet!");
      }
    } catch (err) {
      console.error("connectWallet error:", err);
      alert("Failed to connect wallet. See console.");
    }
  };

  // Basit: fortune metnini Base / EVM ağına hex olarak koyup sendTransaction ile gönderiyoruz.
  // (Demo amaçlı; gerçek uygulamada mutlaka bir kontrat veya güvenli çözüm kullan.)
  const saveToBlockchain = async (fortuneText: string) => {
    try {
      if (typeof window === "undefined" || !(window as any).ethereum) {
        console.warn("No wallet to save to blockchain.");
        return;
      }

      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();

      // fortuneText -> hex data (utf8)
      const hex = "0x" + Buffer.from(fortuneText, "utf8").toString("hex");

      const tx = await signer.sendTransaction({
        to: "0x0000000000000000000000000000000000000000", // demo hedef
        value: 0n,
        data: hex
      });

      console.log("Transaction sent:", tx);
      alert("Transaction sent (check wallet / explorer).");
    } catch (err) {
      console.error("saveToBlockchain error:", err);
      alert("Failed to save to blockchain. See console.");
    }
  };

  const revealFortune = async () => {
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    setFortune(randomFortune);
    // opsiyonel: eğer wallet bağlıysa zincire yaz
    if (walletConnected) {
      await saveToBlockchain(randomFortune);
    }
  };

  return (
    <>
      <Head>
        <title>Fortune Teller 🔮</title>
        <meta name="description" content="Reveal your daily fortune and share it on Farcaster!" />
        {/* Not: Farcaster için fc:frame benzeri meta bilgileri BURAYA koyma — 
            bunlar /well-known/farcaster.json'de olmalı. */}
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
          padding: "1rem"
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Fortune Teller 🔮</h1>
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
              fontWeight: "bold"
            }}
          >
            Connect Wallet
          </button>
        ) : (
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={revealFortune}
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#fff",
                color: "#6b46c1",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Reveal Fortune
            </button>
            <div style={{ alignSelf: "center", color: "white", opacity: 0.9 }}>
              {walletAddress ? walletAddress.slice(0, 6) + "…" + walletAddress.slice(-4) : "Connected"}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
