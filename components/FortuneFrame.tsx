// components/FortuneFrame.tsx
import React, { useState } from "react";
import MiniApp from "@farcaster/miniapp-sdk";

export default function FortuneFrame() {
  const [fortune, setFortune] = useState<string>(
    "🤔 Click below to reveal your fortune!"
  );

  const revealFortune = () => {
    const fortunes = [
      "🍀 Great luck is coming your way!",
      "⚡ Be cautious today.",
      "🎉 You will have a pleasant surprise!",
      "💡 Inspiration will strike soon.",
    ];
    const random = fortunes[Math.floor(Math.random() * fortunes.length)];
    setFortune(random);
  };

  return (
    <MiniApp appId="fortune-miniapp">
      <div className="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-b from-purple-50 to-purple-200">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">
          🧿 Fortune MiniApp
        </h1>
        <p className="text-xl text-purple-900 mb-6">{fortune}</p>
        <button
          className="px-6 py-3 bg-purple-700 text-white rounded-lg shadow-md hover:bg-purple-800 transition"
          onClick={revealFortune}
        >
          Reveal Fortune
        </button>
      </div>
    </MiniApp>
  );
}
