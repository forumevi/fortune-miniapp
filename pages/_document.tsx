// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* ✅ Corrected OG tags */}
        <meta property="og:title" content="🧿 Fortune MiniApp" />
        <meta property="og:description" content="Tap to reveal your daily fortune ✨" />
        <meta property="og:image" content="https://fortune-miniapp-six.vercel.app/icon.png" />
        <meta property="og:url" content="https://fortune-miniapp-six.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* ✅ Farcaster Frame meta */}
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://fortune-miniapp-six.vercel.app/icon.png" />
        <meta property="fc:frame:post_url" content="https://fortune-miniapp-six.vercel.app/api/metadata" />
        <meta property="fc:frame:button:1" content="Reveal Fortune" />
        <meta property="fc:frame:button:1:action" content="post" />

        <title>Fortune Teller 🔮</title>
        <meta
          name="description"
          content="Reveal your daily fortune and share it on Farcaster!"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
