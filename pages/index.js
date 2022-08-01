import { getLocalData } from "../lib/api";
import Banner from "../components/Banner";
import List from "../components/List";

import { ADS_SLOT_ID } from "../lib/constants";

import Layout from "../components/Layout";
import Head from "next/head";

export default function Home({ data, global }) {
  let recipes = data.recipes;

  // let tmp = [];
  // recipes.map((i) => tmp.push(`${i.title} - ${i.id}`));
  // console.log(tmp.join(`,`));

  // console.log(`recipes total`, recipes.length);

  return (
    <>
      <Head>
        <title>Recipe Guru</title>
      </Head>
      <Layout items={global.categories}>
        {/* <div className="p-20">{images.join(`\n`)}</div> */}
        <div className="container mx-auto">
          <Banner
            className={``}
            style={{ display: "block" }}
            slot={ADS_SLOT_ID.home}
            responsive="true"
            format={[`rectangle`, `horizontal`]}
          />
          <header className="m-4 text-center">
            <h6 className="text-sm font-medium text-orange-600">
              <span>+100 สูตรง่าย ๆ</span>
            </h6>
            <h2 className="my-2 text-4xl font-medium text-slate-700">
              สูตรล่าสุด
            </h2>
            <h5 className="my-2 text-slate-400">
              เทรนด์อาหาร สูตรอาหารง่ายๆ
              และแนวคิดเรื่องอาหารเพื่อสุขภาพที่จะช่วยให้คุณทำอาหารได้อย่างชาญฉลาด
            </h5>
          </header>
          <div className="grid gap-4 xl:my-8 xl:grid-cols-4 xl:gap-6">
            <List items={recipes} type={`recipes`} SLOT_ID={ADS_SLOT_ID.home} />
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps = async (ctx) => {
  // const categories = await getLocalData(`categories`);

  let recipes = [];

  // const posts = await getLocalData(`posts`).then((res) => res.slice(0, 10));

  const recipesOriginal = await getLocalData(`recipes`).then((res) =>
    res.slice()
  );
  recipesOriginal.map((recipe) => {
    let tmp = {
      title: recipe.title,
      id: recipe.id,
      category: recipe.category,
      recipe_image_url: recipe.recipe_image_url,
    };
    recipes.push(tmp);
  });

  return {
    props: {
      data: {
        // categories,
        // posts: posts ? posts : `Nothing`,

        recipes,
      },
    },
  };
};
