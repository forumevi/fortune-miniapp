// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Embed için tek meta */}
        <meta
          name="fc:miniapp"
          content={JSON.stringify({
            version: "1",
            imageUrl: "https://fortune-miniapp-six.vercel.app/icon.png",
            button: {
              title: "Reveal Fortune",
              action: {
                type: "launch_miniapp",
                url: "https://fortune-miniapp-six.vercel.app"
              }
            }
          })}
        />
        {/* Eğer geriye dönük destek istersen altına: */}
        <meta
          name="fc:frame"
          content={JSON.stringify({
            version: "1",
            imageUrl: "https://fortune-miniapp-six.vercel.app/icon.png",
            button: {
              title: "Reveal Fortune",
              action: {
                type: "launch_frame",
                url: "https://fortune-miniapp-six.vercel.app"
              }
            }
          })}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
