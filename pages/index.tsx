// pages/index.tsx
"use client";

import { useEffect, useState } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

export default function Home() {
  const [fortune, setFortune] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMiniApp, setIsMiniApp] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        // Farcaster MiniApp ortamında mıyız?
        const miniApp = await sdk.context.isMiniApp();
        setIsMiniApp(miniApp);

        if (miniApp) {
          console.log("✅ Running inside Farcaster MiniApp");
          await sdk.actions.ready(); // 🔥 Splash screen burada kapanır
        } else {
          console.warn("⚠️ Not inside Farcaster MiniApp context");
        }

        setLoading(false);
      } catch (err) {
        console.error("SDK init error:", err);
        setLoading(false);
      }
    }

    init();
  }, []);

  const fortunes = [
    "✨ Bugün şans seninle, yeni başlangıçlara açık ol!",
    "🌙 Bir dilek tut, evren seni duyuyor.",
    "🔥 Cesur ol — risk almadan kazanç olmaz.",
    "🍀 Güzel haberler yolda, sabırlı ol.",
    "🌟 Enerjini yüksek tut, doğru insanlar seni bulacak."
  ];

  const revealFortune = () => {
    const random = fortunes[Math.floor(Math.random() * fortunes.length)];
    setFortune(random);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-purple-900 text-white">
        <p>🔮 MiniApp Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-700 to-indigo-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Fortune Teller 🔮</h1>

      <button
        onClick={revealFortune}
        className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow-lg transition-all"
      >
        Reveal Fortune
      </button>

      {fortune && (
        <div className="mt-8 text-center bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg max-w-sm">
          <p className="text-xl">{fortune}</p>
        </div>
      )}

      {!isMiniApp && (
        <p className="mt-10 text-sm opacity-70">
          (⚠️ Not running in Farcaster MiniApp — open from Farcaster mobile app)
        </p>
      )}
    </div>
  );
}
