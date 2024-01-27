import NavBar from "src/components/navbar";
import Head from "next/head";
import { api } from "~/utils/api";

type Inputs = {
  textAreaID: string
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Machado</title>
        <meta name="assis" content="escrita criativa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-grow flex-col items-center bg-gradient-to-b from-amber-300 to-slate-600">
        <NavBar />
        exercises track
      </main>
    </>
  );
}


