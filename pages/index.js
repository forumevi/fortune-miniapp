// pages/index.js
import React, { useEffect, useRef, useState } from "react";

export default function Home() {
  const [fortune, setFortune] = useState("🤔 Click below to reveal your fortune!");
  const miniAppContainer = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && miniAppContainer.current) {
      import("@farcaster/miniapp-sdk").then(({ default: MiniApp }) => {
        MiniApp({
          appId: "fortune-miniapp",
          element: miniAppContainer.current,
          onResult: (data) => {
            if (data && data.result) setFortune(data.result);
          },
        });
      }).catch((err) => {
        console.error("MiniApp SDK yüklenirken hata:", err);
      });
    }
  }, []);

  // Örnek manuel tetikleme: kullanıcı tuşa basınca MiniApp'i çalıştırıyoruz
  const handleReveal = () => {
    if (typeof window !== "undefined" && miniAppContainer.current) {
      import("@farcaster/miniapp-sdk").then(({ default: MiniApp }) => {
        MiniApp({
          appId: "fortune-miniapp",
          element: miniAppContainer.current,
          onResult: (data) => {
            if (data && data.result) setFortune(data.result);
          },
        });
      });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "1rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1.5rem" }}>Your Fortune Mini App</h1>

      <div
        ref={miniAppContainer}
        style={{ width: "100%", maxWidth: "400px", marginBottom: "1.5rem", border: "1px solid #ccc", borderRadius: "8px", padding: "0.5rem" }}
      />

      <button
        onClick={handleReveal}
        style={{ padding: "0.75rem 1.5rem", fontSize: "1rem", cursor: "pointer", borderRadius: "6px", backgroundColor: "#0070f3", color: "white", border: "none", marginBottom: "1rem" }}
      >
        Reveal Fortune
      </button>

      <p style={{ fontSize: "1.25rem" }}>{fortune}</p>
    </div>
  );
}
