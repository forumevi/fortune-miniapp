import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>🧿 Fortune MiniApp</title>
        <meta name="description" content="Tap to reveal your daily fortune ✨" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="🧿 Fortune MiniApp" />
        <meta property="og:description" content="Tap to reveal your daily fortune ✨" />
        <meta property="og:image" content="/icon.png" />
        <meta property="og:url" content="https://fortune-miniapp-six.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
