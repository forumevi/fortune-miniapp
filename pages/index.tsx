import React, { useEffect, useState } from "react";
import Head from "next/head";
import { ethers } from "ethers";
import { sdk } from "@farcaster/frame-sdk"; // ✅ Farcaster SDK eklendi

export default function Home() {
  const [fortune, setFortune] = useState("🔮 Click to reveal your fortune!");
  const [walletConnected, setWalletConnected] = useState(false);
  const [isInApp, setIsInApp] = useState(false);

  const fortunes = [
    "✨ Great opportunities await you!",
    "🍀 Luck favors you — take the leap!",
    "🌞 Today’s energy will bring you joy.",
    "🌙 Trust your intuition; it won’t fail you.",
    "🔥 Passion drives success today."
  ];

  useEffect(() => {
    // Farcaster MiniApp ortamında çalıştığını algıla
    const ua = navigator.userAgent || "";
    if (/Warpcast/i.test(ua)) {
      setIsInApp(true);
    }

    // ✅ Warpcast splash screen kaldırma
    sdk.actions.ready();
  }, []);

  const connectWallet = async () => {
    try {
      if (typeof window !== "undefined" && (window as any).ethereum) {
        await (window as any).ethereum.request({ method: "eth_requestAccounts" });
        setWalletConnected(true);
        alert("Wallet connected successfully!");
      } else {
        alert("No wallet detected. Please install MetaMask or Base wallet!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const saveToBlockchain = async (fortuneText: string) => {
    try {
      if (typeof window === "undefined" || !(window as any).ethereum) return;
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();

      const tx = await signer.sendTransaction({
        to: "0x0000000000000000000000000000000000000000",
        value: 0n,
        data: ethers.hexlify(ethers.toUtf8Bytes(fortuneText))
      });

      console.log("Transaction sent:", tx);
    } catch (err) {
      console.error(err);
    }
  };

  const revealFortune = () => {
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    setFortune(randomFortune);
    saveToBlockchain(randomFortune);
  };

  return (
    <>
      <Head>
        <title>Fortune Teller 🔮</title>
        <meta name="description" content="Reveal your daily fortune and share it on Farcaster!" />
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

        {isInApp ? (
          <p style={{ fontSize: "1rem" }}>🧿 Open this in your browser to connect wallet</p>
        ) : !walletConnected ? (
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
        )}
      </div>
    </>
  );
}
