import React, { useEffect, useRef, useState } from "react";
import MiniApp from "@farcaster/miniapp-sdk";

export default function Home() {
  const [fortune, setFortune] = useState("🤔 Click below to reveal your fortune!");
  const miniAppContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (miniAppContainer.current) {
      // SDK artık bir nesne olarak değil, fonksiyon olarak çağrılıyor
      MiniApp({ appId: "fortune-miniapp", element: miniAppContainer.current });
    }
  }, []);

  const handleReveal = () => {
    const fortunes = [
      "🍀 Great luck is coming your way!",
      "🌙 Reflect and find your inner peace.",
      "💰 A surprise reward is waiting for you.",
      "✨ New opportunities are ahead!"
    ];
    setFortune(fortunes[Math.floor(Math.random() * fortunes.length)]);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-b from-purple-50 to-purple-200">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">🧿 Fortune MiniApp</h1>

      <div ref={miniAppContainer} className="w-full max-w-md mb-6"></div>

      <p className="text-xl mb-4">{fortune}</p>
      <button
        onClick={handleReveal}
        className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
      >
        Reveal Fortune
      </button>
    </div>
  );
}
