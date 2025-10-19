"use client";

import React, { useState } from "react";
import MiniApp from "@farcaster/miniapp-sdk";
import Confetti from "react-confetti";

export default function FortuneFrame() {
  const [fortune, setFortune] = useState<string>(
    "🤔 Click below to reveal your fortune!"
  );
  const [showConfetti, setShowConfetti] = useState(false);

  const revealFortune = () => {
    const fortunes = [
      "🍀 Great luck awaits you!",
      "🌟 Today is your day!",
      "💫 Something magical will happen!",
      "🔥 Take a bold step forward!"
    ];
    const random = fortunes[Math.floor(Math.random() * fortunes.length)];
    setFortune(random);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <MiniApp>
      {showConfetti && <Confetti />}
      <div className="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-b from-purple-50 to-purple-200">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">
          🧿 Fortune MiniApp
        </h1>
        <p className="text-xl mb-6">{fortune}</p>
        <button
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          onClick={revealFortune}
        >
          Reveal Fortune
        </button>
      </div>
    </MiniApp>
  );
}
