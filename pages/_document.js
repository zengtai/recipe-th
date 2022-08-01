import Document, { Html, Head, Main, NextScript } from "next/document";
import { useEffect } from "react";
import { ADS_ID } from "../lib/constants";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
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
      <Html lang="th">
        <Head>
          <script
            id="adsense-init"
            onError={(e) => {
              console.error("Script failed to load", e);
            }}
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS_ID}`}
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
