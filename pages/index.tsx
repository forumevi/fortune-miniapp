import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [fortune, setFortune] = useState<string>("🔮 Click to reveal your fortune!");

  const fortunes = [
    "🌟 A lucky opportunity is on the horizon!",
    "💫 Trust your intuition — it knows the way.",
    "🔥 Passion will lead you to success soon.",
    "🌈 Expect good news before the day ends!",
    "🌿 Stay grounded, something beautiful is growing.",
  ];

  const revealFortune = () => {
    const random = Math.floor(Math.random() * fortunes.length);
    setFortune(fortunes[random]);
  };

  return (
    <>
      <Head>
        <title>Fortune Teller 🔮</title>
        <meta
          name="description"
          content="Get your daily fortune and share it on Farcaster!"
        />
        <meta property="og:title" content="Fortune Teller 🔮" />
        <meta
          property="og:description"
          content="Get your daily fortune and share it on Farcaster!"
        />
        <meta
          property="og:image"
          content="https://fortune-miniapp-six.vercel.app/icon.png"
        />
        <meta
          name="fc:miniapp"
          content='{"version":"1","imageUrl":"https://fortune-miniapp-six.vercel.app/icon.png","button":{"title":"🔮 Reveal Fortune","action":{"type":"launch_frame","name":"Fortune Teller","url":"https://fortune-miniapp-six.vercel.app"}}}'
        />
      </Head>

      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #6B46C1, #805AD5)",
          color: "white",
          textAlign: "center",
          fontFamily: "sans-serif",
          padding: "1rem",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Fortune Teller 🔮</h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>{fortune}</p>
        <button
          onClick={revealFortune}
          style={{
            backgroundColor: "#F6AD55",
            color: "#1A202C",
            border: "none",
            padding: "0.8rem 1.2rem",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          Reveal My Fortune ✨
        </button>
      </main>
    </>
  );
}
