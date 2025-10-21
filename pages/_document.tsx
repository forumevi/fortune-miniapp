import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Fortune Teller 🔮</title>
        <meta name="description" content="Reveal your daily fortune and share it on Farcaster!" />

        {/* ✅ Farcaster MiniApp Embed */}
        <meta
          name="fc:miniapp"
          content={JSON.stringify({
            version: "1",
            imageUrl: "https://fortune-miniapp-six.vercel.app/icon.png",
            button: {
              title: "Reveal Fortune",
              action: {
                type: "launch_frame",      // validator bunu bekliyor
                name: "Fortune Teller",     // ⚡ zorunlu alan — eksikse Embed Valid ✕ olur
                url: "https://fortune-miniapp-six.vercel.app"
              }
            }
          })}
        />

        {/* OG / Twitter tags */}
        <meta property="og:title" content="Fortune Teller 🔮" />
        <meta
          property="og:description"
          content="Reveal your daily fortune and share it on Farcaster!"
        />
        <meta
          property="og:image"
          content="https://fortune-miniapp-six.vercel.app/icon.png"
        />
        <meta
          property="og:url"
          content="https://fortune-miniapp-six.vercel.app"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
