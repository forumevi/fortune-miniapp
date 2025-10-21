// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Farcaster frame meta tags */}
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://fortune-miniapp-six.vercel.app/icon.png" />
        <meta property="fc:frame:post_url" content="https://fortune-miniapp-six.vercel.app/api/metadata" />
        <meta property="fc:frame:button:1" content="Reveal Fortune" />
        <meta property="fc:frame:button:1:action" content="post" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
