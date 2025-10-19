// pages/index.tsx
import React, { useEffect, useRef, useState } from "react";
import MiniApp from "@farcaster/miniapp-sdk"; // default import

export default function Home() {
  const miniAppContainer = useRef<HTMLDivElement>(null);
  const [fortune, setFortune] = useState("🤔 Click below to reveal your fortune!");

  useEffect(() => {
    if (miniAppContainer.current) {
      // MiniApp SDK fonksiyon olarak çağrılıyor
      MiniApp({
        appId: "fortune-miniapp",
        element: miniAppContainer.current,
      });
    }
  }, []);

  const handleReveal = () => {
    // Örnek fortune seçimi
    const fortunes = [
      "🍀 Good luck is coming your way!",
      "⚡ Be ready for surprises!",
      "🌸 Today is a calm day.",
      "🔥 Challenge yourself!"
    ];
    const randomIndex = Math.floor(Math.random() * fortunes.length);
    setFortune(fortunes[randomIndex]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Fortune Mini App</h1>

      {/* MiniApp embed */}
      <div className="w-full max-w-md mb-6" ref={miniAppContainer}></div>

      <p className="text-xl mb-4">{fortune}</p>
      <button
        onClick={handleReveal}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Reveal Fortune
      </button>
    </div>
  );
}
