import React, { useEffect, useState } from "react";
import Head from "next/head";
import { ethers } from "ethers";
import { sdk } from "@farcaster/miniapp-sdk";

export default function Home() {
  const [fortune, setFortune] = useState("🔮 Click to reveal your fortune!");
  const [walletConnected, setWalletConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    try {
      sdk.actions.ready();
    } catch {
      // ignore
    }
  }, []);

  const connectWallet = async () => {
    try {
      // normal tarayıcı
      if (typeof window !== "undefined" && (window as any).ethereum) {
        await (window as any).ethereum.request({ method: "eth_requestAccounts" });
        const acc = await (window as any).ethereum.request({ method: "eth_accounts" });
        if (acc && acc.length > 0) {
          setAddress(acc[0]);
          setWalletConnected(true);
          alert("Wallet connected successfully!");
        }
      } 
      // Farcaster MiniApp ortamı
      else if (sdk.wallet && typeof sdk.wallet.getEthereumProvider === "function") {
        const provider = await sdk.wallet.getEthereumProvider();
        const accs: string[] = await provider.request({ method: "eth_requestAccounts" });
        if (accs && accs.length > 0) {
          setAddress(accs[0]);
          setWalletConnected(true);
          alert(`Connected wallet: ${accs[0]}`);
        } else {
          alert("No account returned from Farcaster wallet.");
        }
      } else {
        alert("No wallet detected. Please install MetaMask or open in Farcaster!");
      }
    } catch (err) {
      console.error("connectWallet error:", err);
      alert("Wallet connection failed. Check console for details.");
    }
  };

  const saveToBlockchain = async (fortuneText: string) => {
    try {
      if (!(typeof window !== "undefined" && (window as any).ethereum)) return;
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      await signer.sendTransaction({
        to: "0x0000000000000000000000000000000000000000",
        value: 0n,
        data: ethers.hexlify(ethers.toUtf8Bytes(fortuneText))
      });
      console.log("Transaction sent");
    } catch (err) {
      console.error("saveToBlockchain error:", err);
    }
  };

  const revealFortune = () => {
    const randomFortune = [
      "✨ Great opportunities await you!",
      "🍀 Luck favors you — take the leap!",
      "🌞 Today’s energy will bring you joy.",
      "🌙 Trust your intuition; it won’t fail you.",
      "🔥 Passion drives success today."
    ][Math.floor(Math.random() * 5)];
    setFortune(randomFortune);
    if (walletConnected) saveToBlockchain(randomFortune);
  };

  return (
    <>
      <Head>
        <title>Fortune Teller 🔮</title>
        <meta name="description" content="Reveal your daily fortune and share it on Farcaster!" />
        <meta property="og:title" content="Fortune Teller 🔮" />
        <meta property="og:description" content="Reveal your daily fortune and share it on Farcaster!" />
        <meta property="og:image" content="https://fortune-miniapp-six.vercel.app/icon.png" />
        <meta property="og:url" content="https://fortune-miniapp-six.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div style={{
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
      }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Fortune Teller 🔮</h1>
        <p style={{ fontSize: "1.25rem", marginBottom: "2rem" }}>{fortune}</p>

        {!walletConnected ? (
          <button onClick={connectWallet} style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#fff",
            color: "#6b46c1",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "bold"
          }}>
            Connect Wallet
          </button>
        ) : (
          <button onClick={revealFortune} style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#fff",
            color: "#6b46c1",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "bold"
          }}>
            Reveal Fortune
          </button>
        )}
      </div>
    </>
  );
}
