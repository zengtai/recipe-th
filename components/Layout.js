import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
// import { Head } from "next/head";

export default function Layout({ items, children }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let adsLength = document.querySelectorAll(
        ".adsbygoogle:only-child"
      ).length;
      for (let i = 0; i < adsLength; i++) {
        try {
          (window.adsbygoogle || []).push({});
        } catch (e) {
          console.error(`Adsense Error: `, e);
        }
      }
      // try {
      //   (window.adsbygoogle || []).push({});
      // } catch (e) {
      //   console.error(`Adsense Error: `, e);
      // }
    }
  }, []);
  return (
    <>
      {/* <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head> */}
      <div className="flex min-h-screen flex-col">
        <Navbar items={items} />
        <main className="mt-20 mb-6 grow xl:mt-32">{children}</main>
        <Footer />
      </div>
    </>
  );
}
