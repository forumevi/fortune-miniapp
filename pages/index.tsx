import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { ethers } from "ethers";
import { create } from "ipfs-http-client";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fortune, setFortune] = useState<string>("🔮 Click to reveal your fortune!");
  const [wallet, setWallet] = useState<string | null>(null);
  const [ipfsHash, setIpfsHash] = useState<string | null>(null);

  const fortunes = [
    "Luck favors you — take the leap!",
    "An unexpected opportunity is coming.",
    "Your hard work will soon pay off.",
    "A pleasant surprise awaits you.",
    "Be bold — success is near!"
  ];

  // Günlük fortune oluşturucu
  const getDailyFortune = (address: string) => {
    const today = new Date().toISOString().split("T")[0];
    const seed = address + today;
    const index = Math.abs([...seed].reduce((a, b) => a + b.charCodeAt(0), 0)) % fortunes.length;
    return fortunes[index];
  };

  // IPFS bağlantısı (public gateway)
  const client = create({ url: "https://ipfs.io" });

  // Blockchain'e fortune yaz
  const saveToBlockchain = async (fortune: string) => {
    try {
      if (!(window as any).ethereum) {
        alert("No wallet detected. Please install MetaMask or Base wallet!");
        return;
      }

      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWallet(address);

      // IPFS'e yükle
      const { path } = await client.add(fortune);
      setIpfsHash(path);

      // Zincire yaz
      const tx = await signer.sendTransaction({
        to: "0x0000000000000000000000000000000000000000",
        value: 0n,
        data: ethers.hexlify(ethers.toUtf8Bytes(`ipfs://${path}`)),
      });

      alert(`Fortune saved to blockchain!\nTx hash: ${tx.hash}`);
    } catch (err) {
      console.error(err);
      alert("Error saving to blockchain!");
    }
  };

  // Fortune'u göster
  const revealFortune = async () => {
    if (!wallet) {
      const fortune = "Please connect your wallet first!";
      setFortune(fortune);
      return;
    }

    const dailyFortune = getDailyFortune(wallet);
    setFortune(dailyFortune);
    await saveToBlockchain(dailyFortune);
  };

  // Farcaster’da paylaş
  const shareOnFarcaster = () => {
    const text = encodeURIComponent(`My daily fortune: "${fortune}" 🔮`);
    const embed = ipfsHash ? `&embeds[]=https://ipfs.io/ipfs/${ipfsHash}` : "";
    const farcasterUrl = `https://warpcast.com/~/compose?text=${text}${embed}`;
    window.open(farcasterUrl, "_blank");
  };

  return (
    <>
      {/* 🧠 Meta ve Farcaster Embed Etiketleri */}
      <Head>
        <title>Fortune Teller 🔮</title>
        <meta name="description" content="Reveal your daily fortune and share it on Farcaster!" />
        <meta property="og:title" content="Fortune Teller 🔮" />
        <meta property="og:description" content="Get your daily fortune and share it!" />
        <meta property="og:image" content="https://fortune-miniapp-six.vercel.app/icon.png" />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://fortune-miniapp-six.vercel.app/icon.png" />
        <meta property="fc:frame:button:1" content="Reveal Fortune" />
        <meta property="fc:frame:post_url" content="https://fortune-miniapp-six.vercel.app/api/fortune" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-700 to-indigo-900 text-white text-center p-6">
        <h1 className="text-4xl font-bold mb-4">Fortune Teller 🔮</h1>
        <p className="text-lg mb-8">Luck favors you — take the leap!</p>

        <button
          onClick={revealFortune}
          className="px-6 py-3 bg-white text-purple-700 rounded-2xl font-semibold shadow-md hover:bg-purple-100 transition"
        >
          Reveal Fortune
        </button>

        {fortune && (
          <div className="mt-6 bg-purple-800/40 p-4 rounded-xl w-80 text-white border border-purple-400">
            <p>{fortune}</p>
          </div>
        )}

        {ipfsHash && (
          <button
            onClick={shareOnFarcaster}
            className="mt-4 px-6 py-3 bg-fuchsia-500 text-white rounded-2xl font-semibold shadow-md hover:bg-fuchsia-400 transition"
          >
            Share on Farcaster 💬
          </button>
        )}
      </main>
    </>
  );
}
