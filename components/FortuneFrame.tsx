"use client";

import { useState } from "react";
import { MiniAppFrame } from "@farcaster/miniapp-sdk";

export default function FortuneFrame() {
  const [fortune, setFortune] = useState("🤔 Click below to reveal your fortune!");

  const fortunes = [
    "🍀 Today is your lucky day!",
    "💫 Big opportunities are on the horizon.",
    "🔥 Believe in yourself — great things are coming.",
    "🌙 The universe is aligning in your favor.",
    "🌞 A smile will bring you unexpected joy!"
  ];

  const handleReveal = () => {
    const random = fortunes[Math.floor(Math.random() * fortunes.length)];
    setFortune(random);
  };

  return (
    <MiniAppFrame>
      <div className="flex flex-col items-center justify-center h-screen text-center p-4">
        <h1 className="text-2xl font-bold mb-4 text-purple-600">FortuneCast ✨</h1>
        <p className="text-lg mb-6">{fortune}</p>
        <button
          onClick={handleReveal}
          className="bg-purple-600 text-white py-2 px-6 rounded-xl hover:bg-purple-700 transition-all"
        >
          Reveal My Fortune
        </button>
      </div>
    </MiniAppFrame>
  );
}