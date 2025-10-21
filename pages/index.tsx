// pages/index.tsx
import React, { useState } from "react";
import Head from "next/head";
import { ethers } from "ethers";

export default function Home() {
  const [wallet, setWallet] = useState<string | null>(null);
  const [fortune, setFortune] = useState<string>("🔮 Click to reveal your fortune!");
  const fortunes = [
    "Luck favors you — take the leap!",
    "A pleasant surprise is waiting for you.",
    "You’ll soon cross paths with opportunity.",
    "Someone is thinking about you right now.",
    "A dream you have will come true.",
  ];

  const connectWallet = async () => {
    try {
      if (!(window as any).ethereum) {
        alert("Please install MetaMask or Base wallet!");
        return;
      }
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWallet(address);
      alert(`Wallet connected: ${address.substring(0, 6)}...`);
    } catch (err) {
      console.error(err);
      alert("Failed to connect wallet.");
    }
  };

  const revealFortune = async () => {
    if (!wallet) {
      alert("Please connect your wallet first!");
      return;
    }

    const random = fortunes[Math.floor(Math.random() * fortunes.length)];
    setFortune(random);

    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to: "0x0000000000000000000000000000000000000000",
        value: 0n,
        data: ethers.hexlify(ethers.toUtf8Bytes(random)),
      });
      console.log("Transaction sent:", tx);
    } catch (err) {
      console.error("Error saving fortune:", err);
    }
  };

  return (
    <>
  <Head>
  <title>Fortune Teller 🔮</title>
  <meta name="description" content="Reveal your daily fortune on Farcaster!" />

  {/* Open Graph */}
  <meta property="og:title" content="Fortune Teller 🔮" />
  <meta property="og:description" content="Reveal your daily fortune and share it on Farcaster!" />
  <meta property="og:image" content="https://fortune-miniapp-six.vercel.app/icon.png" />
  <meta property="og:url" content="https://fortune-miniapp-six.vercel.app" />
  <meta property="og:type" content="website" />

  {/* Farcaster Frame Meta */}
  <meta property="fc:frame" content="vNext" />
  <meta property="fc:frame:post_url" content="https://fortune-miniapp-six.vercel.app/api/metadata" />
  <meta property="fc:frame:image" content="https://fortune-miniapp-six.vercel.app/icon.png" />
  <meta property="fc:frame:button:1" content="Reveal Fortune" />
  <meta property="fc:frame:button:1:action" content="post" />
</Head>



      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 text-white p-6 text-center">
        <h1 className="text-4xl font-bold mb-6">Fortune Teller 🔮</h1>

        {!wallet ? (
          <button
            onClick={connectWallet}
            className="mb-4 px-6 py-3 bg-fuchsia-600 text-white rounded-2xl font-semibold shadow-md hover:bg-fuchsia-500 transition"
          >
            Connect Wallet 💼
          </button>
        ) : (
          <p className="mb-4 text-lg">Connected: {wallet.substring(0, 6)}...</p>
        )}

        <button
          onClick={revealFortune}
          className="px-6 py-3 bg-pink-500 rounded-xl text-lg font-semibold shadow-md hover:bg-pink-400 transition"
        >
          Reveal Fortune
        </button>

        <p className="text-xl mt-6">{fortune}</p>
      </main>
    </>
  );
}
