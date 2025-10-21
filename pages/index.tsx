// pages/index.tsx
import React, { useEffect, useRef, useState } from "react";
import { ethers } from "ethers";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fortune, setFortune] = useState("🔮 Click to reveal your fortune!");
  const [txHash, setTxHash] = useState<string | null>(null);

  const fortunes = [
    "Great luck awaits you today!",
    "A pleasant surprise is on its way.",
    "You will meet someone who changes your perspective.",
    "An opportunity will appear — be ready.",
    "Your patience will pay off soon.",
    "New beginnings are on the horizon.",
  ];

  // Blockchain’e yazma fonksiyonu (Base ağında)
  const saveToBlockchain = async (fortune: string) => {
    try {
      if (!window.ethereum) {
        alert("No wallet detected. Please install MetaMask or Base wallet!");
        return;
      }

      // Base mainnet chain ID = 0x2105
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x2105" }],
      });

      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Fortune mesajını Base ağına data olarak yaz
      const tx = await signer.sendTransaction({
        to: signer.address,
        value: 0n,
        data: ethers.encodeBytes32String(fortune),
      });

      setTxHash(tx.hash);
    } catch (err) {
      console.error("Blockchain save error:", err);
      alert("Error while saving to blockchain. Check console for details.");
    }
  };

  const revealFortune = async () => {
    const random = Math.floor(Math.random() * fortunes.length);
    const chosen = fortunes[random];
    setFortune(chosen);
    await saveToBlockchain(chosen);
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #3a0ca3, #7209b7, #f72585)",
        color: "white",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <img
        src="/icon.png"
        alt="Fortune Icon"
        style={{ width: "100px", marginBottom: "1rem" }}
      />
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Fortune Teller 🔮</h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>{fortune}</p>

      <button
        onClick={revealFortune}
        style={{
          backgroundColor: "#ffbe0b",
          border: "none",
          borderRadius: "10px",
          padding: "0.8rem 1.5rem",
          fontSize: "1rem",
          fontWeight: "bold",
          cursor: "pointer",
          color: "#333",
        }}
      >
        Reveal Fortune ✨
      </button>

      {txHash && (
        <p style={{ marginTop: "1rem" }}>
          🔗 Saved on Base:{" "}
          <a
            href={`https://basescan.org/tx/${txHash}`}
            target="_blank"
            rel="noreferrer"
            style={{ color: "#fbd38d" }}
          >
            View Transaction
          </a>
        </p>
      )}
    </div>
  );
}
