import App from "next/app";

import Head from "next/head";

import { useRouter } from "next/router";
import { useEffect } from "react";

import { getLocalData } from "../lib/api";
import { GA_ID } from "../lib/constants";

import Script from "next/script";

import * as gtag from "../lib/gtag";

import NProgress from "nprogress";
import "../public/nprogress.css";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  const Router = useRouter();
  useEffect(() => {
    const handleRouteStart = (url) => {
      console.log(`Loading: ${url}`);
      NProgress.start();
    };
    const handleRouteDone = (url) => {
      gtag.pageview(url);
      NProgress.done();
    };

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, [Router.events]);
  return (
    <>
      <Head>
        {/* <meta name="google" content="notranslate" /> */}
        <link
          rel="icon"
          href={`${Router.basePath}/favicon.ico`}
          sizes="16x16"
          type="image/x-icon"
        />
      </Head>

      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <Component {...pageProps} />
    </>
  );
};

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  try {
    // ????????????????????????
    const allCategories = await getLocalData(`categories`);

    // ??????????????????
    const recipes = await getLocalData(`recipes`);

    // ??????????????????????????????
    let recipesCategoriesNames = [];
    recipes.forEach((item) => recipesCategoriesNames.push(item.category));

    // ??????????????????????????????
    recipesCategoriesNames = [...new Set(recipesCategoriesNames)];

    // ????????????????????????
    let recipesCategories = allCategories.filter((cat) =>
      recipesCategoriesNames.includes(cat.name)
    );

    // ???????????????????????????????????????
    let categories = [].concat(recipesCategories);

    // ????????????
    categories = [...new Set(categories)];

    return {
      ...appProps,
      pageProps: { global: { categories } },
    };
  } catch (e) {
    return { ...appProps };
  }
};

export default MyApp;
