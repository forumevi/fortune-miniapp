import React, { useState } from "react";
import { MiniApp } from "@farcaster/miniapp-sdk";

export default function Home() {
  const [fortune, setFortune] = useState("🤔 Click below to reveal your fortune!");

  const handleReveal = () => {
    const options = [
      "🌟 You will have an amazing week!",
      "💰 A surprise reward is coming soon!",
      "❤️ Someone admires your positive energy!",
      "🚀 New opportunities are on the horizon!",
    ];
    setFortune(options[Math.floor(Math.random() * options.length)]);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-b from-purple-50 to-purple-200">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">🧿 Fortune MiniApp</h1>
      <MiniApp appId="fortune-miniapp" />
      <p className="text-lg text-gray-700 mb-6">{fortune}</p>
      <button
        onClick={handleReveal}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl"
      >
        Reveal My Fortune ✨
      </button>
    </div>
  );
}
