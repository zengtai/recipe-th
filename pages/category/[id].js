import Link from "next/link";
import Layout from "../../components/Layout";
import List from "../../components/List";
import { getLocalData } from "../../lib/api";

import Head from "next/head";

import Banner from "../../components/Banner";
import { ADS_SLOT_ID } from "../../lib/constants";

export default function Category({ data, global }) {
  // console.log(`data`, data);
  let recipes = data.recipes;

  return (
    <>
      <Head>
        <title>{`${data.currentCategory} | Recipe Guru`}</title>
      </Head>
      <Layout items={global.categories}>
        <div className="container mx-auto">
          <Banner
            className={``}
            style={{ display: "block" }}
            slot={ADS_SLOT_ID.category}
            responsive="true"
            format={[`rectangle`, `horizontal`]}
          />
          <div className="breadcrumb m-4 flex gap-6 whitespace-nowrap text-xs xl:text-sm">
            <div className="breadcrumb-link relative after:absolute after:-right-4 after:opacity-50 after:content-['/']">
              <Link href={`/`}>Home</Link>
            </div>
            <div className="breadcrumb-link opacity-50">
              {data.currentCategory}
            </div>
          </div>
          <h1 className="my-4 text-center text-4xl font-medium text-slate-700">
            {data.currentCategory}
          </h1>
          <div className="grid gap-4 xl:my-8 xl:grid-cols-4 xl:gap-6">
            <List
              items={recipes}
              categories={global.categories}
              SLOT_ID={ADS_SLOT_ID.category}
            />
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps = async (ctx) => {
  // 1. 当前分类名称：通过slug获取
  const allCategories = await getLocalData(`categories`);

  function getCategoryNameById(id) {
    let category = allCategories.find((cat) => cat.id == id);
    return category.name;
  }

  // const currentCategory = getCategoryNameBySlug(ctx.params.slug) || null;

  // 2. 当前分类所属菜谱或文章数据：通过slug获取，slug需要转id

  const recipesOriginal = await getLocalData(`recipes`).then((res) =>
    res.filter(
      (recipe) => recipe.category == getCategoryNameById(ctx.params.id)
    )
  );

  let recipes = [];
  recipesOriginal.map((recipe) => {
    let tmp = {
      title: recipe.title,
      id: recipe.id,
      category: recipe.category,
      recipe_image_url: recipe.recipe_image_url,
    };
    recipes.push(tmp);
  });

  // const posts = await getLocalData(`posts`).then((res) => res.slice(0, 10));

  return {
    props: {
      data: {
        // categories,
        // posts: posts ? posts : `Nothing`,
        recipes,
        // categoryList,
        currentCategory: recipes[0].category,
      },
    },
  };
};

export const getStaticPaths = async (ctx) => {
  const allCategories = await getLocalData(`categories`);

  const recipes = await getLocalData(`recipes`);
  let categoriesNames = recipes.map((recipe) => recipe.category);

  let categories = allCategories.filter((item) =>
    categoriesNames.includes(item.name)
  );

  const ids = categories.map((res) => res.id);

  return {
    paths: ids.map((id) => ({
      params: {
        id: id.toString(),
      },
    })),
    fallback: false,
  };
};
