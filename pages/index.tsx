// pages/index.tsx
import React, { useEffect, useRef, useState } from "react";
import { ethers } from "ethers";

// 🧩 TypeScript için window.ethereum tanımı
declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fortune, setFortune] = useState("🔮 Click to reveal your fortune!");

  const fortunes = [
    "✨ Great success is coming your way!",
    "🌈 A pleasant surprise awaits you soon.",
    "🔥 You’ll conquer a big challenge today.",
    "🍀 Luck favors you — take the leap!",
    "💎 Something valuable will find its way to you."
  ];

  // 🪙 Fortune blockchain'e kaydetme
  const saveToBlockchain = async (fortune: string) => {
    try {
      if (!window.ethereum) {
        alert("No wallet detected. Please install MetaMask or Base wallet!");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // 🧠 data'yı hex string'e dönüştür
      const hexData = ethers.hexlify(ethers.toUtf8Bytes(fortune));

      const tx = await signer.sendTransaction({
        to: "0x0000000000000000000000000000000000000000",
        value: 0n,
        data: hexData
      });

      console.log("Transaction sent:", tx);
      alert(`Fortune saved to blockchain!\nTx hash: ${tx.hash}`);
    } catch (error) {
      console.error(error);
      alert("Failed to save fortune to blockchain!");
    }
  };

  const revealFortune = () => {
    const random = fortunes[Math.floor(Math.random() * fortunes.length)];
    setFortune(random);
    saveToBlockchain(random);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-700 to-indigo-900 text-white p-6">
      <div ref={containerRef} className="w-full max-w-md text-center">
        <h1 className="text-4xl font-bold mb-6">Fortune Teller 🔮</h1>
        <p className="text-xl mb-4">{fortune}</p>
        <button
          onClick={revealFortune}
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
        >
          Reveal Fortune
        </button>
      </div>
    </main>
  );
}
