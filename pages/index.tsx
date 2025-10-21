import React, { useEffect, useRef, useState } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

export default function Home() {
  const [fortune, setFortune] = useState("🔮 Click to reveal your fortune!");
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        await sdk.actions.ready(); // ✅ Farcaster MiniApp SDK'yi hazırla
        console.log("✅ MiniApp SDK ready");
      } catch (error) {
        console.error("❌ MiniApp SDK initialization failed:", error);
      }
    };
    init();
  }, []);

  const fortunes = [
    "✨ Büyük bir şans seni bekliyor!",
    "🌙 Bugün evrenden bir mesaj alacaksın.",
    "🔥 Cesaretin seni başarıya götürecek.",
    "💎 Gerçek değerini bilen biriyle tanışacaksın.",
    "🌞 İç huzurun seni bulmak üzere.",
  ];

  const revealFortune = () => {
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    setFortune(randomFortune);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-50 to-purple-200 text-center p-4">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">
        🧿 Fortune MiniApp
      </h1>

      {/* Farcaster SDK container */}
      <div
        ref={containerRef}
        className="w-full max-w-md mb-6 border border-purple-300 rounded-lg p-4 bg-white shadow"
      />

      <p className="text-xl mb-4">{fortune}</p>

      <button
        onClick={revealFortune}
        className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
      >
        Reveal My Fortune 🔮
      </button>

      <footer className="mt-10 text-sm text-gray-500">
        Powered by Farcaster MiniApp SDK
      </footer>
    </div>
  );
}
