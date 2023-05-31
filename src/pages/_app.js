import "@/styles/globals.css";
import { Header } from "@/components/Header/Header";
import { StoreProvider } from "@/contexts/basketContext";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Germania+One&family=Pirata+One&family=Sen:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <StoreProvider>
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
      </StoreProvider>
    </>
  );
}
