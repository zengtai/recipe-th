import Layout from "../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import { getLocalData, removeLink } from "../../lib/api";

import Banner from "../../components/Banner";

import { ADS_SLOT_ID, IMAGE_BASE } from "../../lib/constants";
import Head from "next/head";

export default function Recipe({ data, global }) {
  // console.log(`recipe`, data.recipe);
  // console.log(`categoryList`, data.categoryList);
  // console.log(`imageUrls`, data.imageUrls);
  // console.log(`categories`, data.categories);

  let recipe = data.recipe;

  let noLink = true;

  return (
    <>
      <Head>
        <title>{`${recipe.title} | Recipe Guru`}</title>
      </Head>
      <Layout items={global.categories}>
        <div className="container mx-auto">
          <Banner
            className={`banner rectangle mt-4`}
            style={{ display: "block" }}
            slot={ADS_SLOT_ID.detail}
            responsive="false"
          />
          <div className="breadcrumb m-4 flex gap-6 whitespace-nowrap text-xs xl:text-sm">
            <div className="breadcrumb-link relative after:absolute after:-right-4 after:opacity-50 after:content-['/']">
              <Link href={`/`}>Home</Link>
            </div>
            <div className="breadcrumb-link relative after:absolute after:-right-4 after:opacity-50 after:content-['/']">
              <Link
                href={`/category/${
                  global.categories.find((item) => item.name == recipe.category)
                    .slug
                }`}
              >
                <a>{recipe.category}</a>
              </Link>
            </div>
          </div>
          <article className="article">
            <div className="mx-4 border xl:flex xl:flex-row-reverse xl:gap-10">
              {/* <div className="relative h-auto w-auto bg-black/5 xl:m-4 xl:h-[400px] xl:w-[400px]">
                <Image
                  src={`${IMAGE_BASE}${recipe.recipe_image_url}`}
                  alt={recipe.title}
                  width={400}
                  height={400}
                  layout={`responsive`}
                />
              </div> */}

              <div className="recipe-info m-4 grow">
                <h1 className="my-4 font-serif text-3xl font-bold text-slate-700 xl:m-4 xl:mx-0 xl:mb-8 xl:text-6xl xl:font-medium">
                  <div dangerouslySetInnerHTML={{ __html: recipe.title }} />
                </h1>
              </div>
            </div>
            <div className="xl:flex">
              <div className="">
                {recipe.content.length !== 0 && (
                  <>
                    <div className="m-4 border bg-slate-100 p-4">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: noLink
                            ? removeLink(recipe.content)
                            : recipe.content,
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </article>
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps = async (ctx) => {
  const categories = await getLocalData(`categories`);
  const recipe = await getLocalData(`recipes`).then((res) =>
    res.find((recipe) => recipe.id == ctx.params.id)
  );

  let categoryList = categories.map((cat) => recipe.category == cat.name);

  return {
    props: {
      data: {
        // categories,
        // posts: posts ? posts : `Nothing`,
        recipe,
        categoryList,
      },
    },
  };
};

export const getStaticPaths = async () => {
  const ids = await getLocalData(`recipes`).then((res) =>
    res.map((recipe) => recipe.id)
  );

  return {
    paths: ids.map((id) => ({
      params: {
        id: id,
      },
    })),
    fallback: false,
  };
};
