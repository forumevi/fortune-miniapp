import React, { useState, useEffect } from "react";
import MiniAppSDK from "@farcaster/miniapp-sdk";

export default function FortuneFrame() {
  const [fortune, setFortune] = useState<string>(
    "🤔 Click below to reveal your fortune!"
  );

  const fortunes = [
    "🌟 You will have an amazing week!",
    "💰 A surprise reward is coming soon!",
    "❤️ Someone admires your positive energy!",
    "🚀 New opportunities are on the horizon!",
    "🎉 A celebration is waiting for you!",
    "🧘 Take a deep breath and enjoy the moment.",
    "📚 Learn something new today—it will pay off!",
  ];

  const handleReveal = () => {
    const random = fortunes[Math.floor(Math.random() * fortunes.length)];
    setFortune(random);
  };

  useEffect(() => {
    // MiniApp başlatılıyor
    MiniAppSDK.init({ appId: "fortune-miniapp" });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-b from-purple-50 to-purple-200">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">
        🧿 Fortune MiniApp
      </h1>
      <p className="text-lg text-gray-700 mb-6 max-w-md">{fortune}</p>
      <button
        onClick={handleReveal}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl shadow-md transition-transform transform hover:scale-105"
      >
        Reveal My Fortune ✨
      </button>
    </div>
  );
}
