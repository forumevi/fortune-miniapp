import React, { useEffect, useRef, useState } from "react";
import initMiniApp from "@farcaster/miniapp-sdk"; // ✅ DÜZELTİLDİ

export default function Home() {
  const [fortune, setFortune] = useState("🔮 Click to reveal your fortune!");
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadMiniApp = async () => {
      try {
        const app = await initMiniApp({
          appId: "fortune-miniapp",
          element: containerRef.current!,
        });
        console.log("✅ MiniApp initialized:", app);
      } catch (err) {
        console.error("❌ MiniApp SDK yüklenirken hata:", err);
      }
    };
    loadMiniApp();
  }, []);

  const fortunes = [
    "✨ Büyük şans seni bekliyor!",
    "🌙 Bugün evrenden güzel bir mesaj gelecek.",
    "🔥 Cesaret seni başarıya götürecek!",
    "💎 Değerini bilen biriyle tanışacaksın.",
    "🌞 İç huzurun seni bulmak üzere.",
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-50 to-purple-200 text-center p-4">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">
        🧿 Fortune MiniApp
      </h1>

      <div
        ref={containerRef}
        className="w-full max-w-md mb-6 border border-purple-300 rounded-lg p-4 bg-white shadow"
      />

      <p className="text-xl mb-4">{fortune}</p>

      <button
        onClick={() =>
          setFortune(fortunes[Math.floor(Math.random() * fortunes.length)])
        }
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
