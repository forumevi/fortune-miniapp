"use client";

import React, { useState } from "react";
import Confetti from "react-confetti";

export default function FortuneFrame() {
  const [fortune, setFortune] = useState<string>(
    "🤔 Click below to reveal your fortune!"
  );
  const [showConfetti, setShowConfetti] = useState(false);

  const fortunes = [
    "🌟 Great success is coming your way!",
    "🍀 Luck will find you today!",
    "💡 A new idea will spark soon.",
    "❤️ Love is in the air!",
    "🎉 Celebrate your achievements!"
  ];

  const revealFortune = () => {
    const randomIndex = Math.floor(Math.random() * fortunes.length);
    setFortune(fortunes[randomIndex]);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <>
      {showConfetti && <Confetti />}
      <div className="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-b from-purple-50 to-purple-200">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">
          🧿 Fortune MiniApp
        </h1>
        <p className="text-xl mb-6">{fortune}</p>
        <button
          onClick={revealFortune}
          className="px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition"
        >
          Reveal Fortune
        </button>
      </div>
    </>
  );
}
