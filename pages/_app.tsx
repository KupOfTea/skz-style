import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>SKZ 취향표</title>
        <meta name="description" content="SKZ 취향표" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:title" content="SKZ 취향표" />
        <meta property="og:description" content="SKZ 취향표" />
        <meta
          property="og:image"
          content="https://skz-style.vercel.app/images/meta.png"
        />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="400" />
        <meta property="og:url" content="https://skz-style.vercel.app/" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="SKZ 취향표" />
        <meta property="twitter:url" content="https://skz-style.vercel.app/" />
        <meta property="twitter:description" content="SKZ 취향표" />
        <meta
          property="twitter:image"
          content="https://skz-style.vercel.app/images/meta.png"
        />
      </Head>
      <div className="font-suite">
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="max-w-lg w-full">
            <RecoilRoot>
              <Component {...pageProps} />
            </RecoilRoot>
          </div>
        </div>
      </div>
    </>
  );
}
