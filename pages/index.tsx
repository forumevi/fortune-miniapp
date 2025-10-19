// pages/index.tsx
import React, { useEffect, useRef, useState } from "react";
import { MiniApp } from "@farcaster/miniapp-sdk"; // fonksiyon olarak çağrılacak

export default function Home() {
  const miniAppContainer = useRef<HTMLDivElement>(null);
  const [fortune, setFortune] = useState("🤔 Click below to reveal your fortune!");

  useEffect(() => {
    if (miniAppContainer.current) {
      // MiniApp embedini fonksiyon olarak çağırıyoruz
      MiniApp({
        appId: "fortune-miniapp",
        element: miniAppContainer.current,
        onEvent: (event) => {
          // Örn: reward veya başka eventleri yakala
          if (event.type === "fortuneRevealed") {
            setFortune(event.data.fortuneText);
          }
        },
      });
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl mb-6">🎲 Fortune Mini App</h1>

      {/* MiniApp embed alanı */}
      <div
        ref={miniAppContainer}
        className="w-full max-w-md mb-6"
        style={{ height: "400px", border: "1px solid #ccc" }}
      ></div>

      {/* Fortune sonucu */}
      <p className="text-xl mb-4">{fortune}</p>
    </div>
  );
}
