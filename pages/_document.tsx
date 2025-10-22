import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
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
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Farcaster MiniApp embed */}
        <meta
          name="fc:miniapp"
          content={JSON.stringify({
            version: "1",
            name: "Fortune MiniApp",
            imageUrl: "https://fortune-miniapp-six.vercel.app/icon.png",
            button: {
              title: "Reveal Fortune",
              action: {
                type: "launch_miniapp",
                name: "Fortune MiniApp",
                url: "https://fortune-miniapp-six.vercel.app",
              },
            },
          })}
        />
      </Head>
      <body>
        <Main />
        <NextScript />

        {/* 🧩 MiniApp SDK splash fix — Ready çağrısı */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (window.farcaster && window.farcaster.miniapp) {
                  try {
                    window.farcaster.miniapp.actions.ready();
                    console.log("✅ sdk.actions.ready() called via inline script");
                  } catch(e) {
                    console.warn("MiniApp ready() failed", e);
                  }
                } else {
                  console.log("ℹ️ Farcaster MiniApp SDK not found yet");
                }
              })();
            `,
          }}
        />
      </body>
    </Html>
  );
}
