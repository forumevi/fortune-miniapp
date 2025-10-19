import React, { useState } from "react";
import MiniApp from "@farcaster/miniapp-sdk";

export default function FortuneFrame() {
  const [fortune, setFortune] = useState<string>(
    "🤔 Click below to reveal your fortune!"
  );

  const revealFortune = () => {
    const fortunes = [
      "🍀 Great luck is coming your way!",
      "🌟 Today is your lucky day!",
      "💫 Expect some surprises soon!",
      "🔥 Adventure awaits you!"
    ];
    const randomIndex = Math.floor(Math.random() * fortunes.length);
    setFortune(fortunes[randomIndex]);
  };

  return (
    <MiniApp>
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
    </MiniApp>
  );
}
