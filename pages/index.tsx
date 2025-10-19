import Head from "next/head";
import FortuneFrame from "../components/FortuneFrame";

export default function Home() {
  return (
    <>
      <Head>
        <title>FortuneCast MiniApp</title>
        <meta name="description" content="Get your daily digital fortune ✨" />
        <meta property="og:title" content="FortuneCast MiniApp" />
        <meta property="og:image" content="/favicon.ico" />
      </Head>
      <FortuneFrame />
    </>
  );
}