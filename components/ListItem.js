import Link from "next/link";
import { IMAGE_BASE } from "../lib/constants";
import Banner from "./Banner";
import Image from "./Image";

export default function ListItem({ item, SLOT_ID }) {
  return (
    <>
      <article className="article mx-4 flex flex-col justify-between border bg-white p-4 shadow-lg">
        <div>
          <Link href={`/recipe/${item.id}`}>
            <a
              // title={ post.title }
              title={item.title}
            >
              <Image
                // src={`${router.basePath}${IMAGE_BASE}${item.recipe_image_url}`}
                src={`${IMAGE_BASE}${item.recipe_image_url}`}
                alt={item.title}
                width={400}
                height={400}
                layout={`responsive`}
                lazy
              />
            </a>
          </Link>
          <h3 className="my-4 text-lg font-medium text-slate-700 no-underline">
            <Link href={`/recipe/${item.id}`}>
              <a title={item.title}>
                <span dangerouslySetInnerHTML={{ __html: item.title }} />
              </a>
            </Link>
          </h3>
          <div className="mb-2 flex flex-wrap gap-2">
            <span className="bg-slate-200 px-1 py-0.5 text-xs">
              {item.category}
            </span>
          </div>
        </div>
        <div className="my-3 flex items-end justify-end">
          <div className="text-right text-slate-700">
            <Link href={`/recipe/${item.id}`}>
              <a
                className="read-more block whitespace-nowrap"
                title={item.title}
              >
                Read More
              </a>
            </Link>
          </div>
        </div>
      </article>
      {SLOT_ID ? (
        <Banner
          style={{ display: "block" }}
          slot={SLOT_ID}
          layout="auto"
          responsive="true"
        />
      ) : null}
    </>
  );
}
