// pages/index.js
import React, { useEffect, useRef, useState } from "react";
import MiniApp from "@farcaster/miniapp-sdk"; // JS olarak import, tip sorunu yok

export default function Home() {
  const miniAppContainer = useRef(null);
  const [fortune, setFortune] = useState("🤔 Click below to reveal your fortune!");

  useEffect(() => {
    if (miniAppContainer.current) {
      // MiniApp SDK fonksiyon olarak çağrılıyor
      MiniApp({
        appId: "fortune-miniapp",
        element: miniAppContainer.current,
        onResult: (data) => {
          if (data && data.result) setFortune(data.result);
        },
      });
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md mb-6" ref={miniAppContainer}></div>
      <p className="text-xl mb-4">{fortune}</p>
    </div>
  );
}
