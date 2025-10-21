import React, { useState } from "react";
import Head from "next/head";

export default function Home() {
  const [fortune, setFortune] = useState("🔮 Tap below to reveal your fortune!");

  const revealFortune = () => {
    const fortunes = [
      "✨ Great luck awaits you today!",
      "🌙 Trust your intuition.",
      "🔥 A bold move will bring rewards.",
      "🌈 Something unexpected brings joy.",
      "💫 The universe is aligning for you!"
    ];
    const random = fortunes[Math.floor(Math.random() * fortunes.length)];
    setFortune(random);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 to-indigo-950 text-white p-6">
      <Head>
        <title>🧿 Fortune MiniApp</title>
        <meta name="description" content="Reveal your daily fortune ✨" />
      </Head>

      <h1 className="text-4xl font-bold mb-6">🧿 Fortune MiniApp</h1>
      <p className="text-xl mb-8 text-center">{fortune}</p>

      <button
        onClick={revealFortune}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all"
      >
        Reveal Fortune ✨
      </button>
    </div>
  );
}
