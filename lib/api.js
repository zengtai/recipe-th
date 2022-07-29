import * as fs from "fs";
import path from "path";

export const API_URL = `https://resepkoki.id/wp-json/wp/v2/`;

export async function fetcher(url) {
  try {
    const json = fetch(url).then((res) => res.json());
    return json;
  } catch (e) {
    console.error(e.messenge);
  }
}

let remoteDataLength = 0;

export async function getRemoteData(url, type, page) {
  const remoteData = await fetch(`${url}${type}?page=${page ? page : 1}`).then(
    async (res) => {
      remoteDataLength = res.headers.get(`x-wp-total`);
      return {
        data: await res.json(),
        total: remoteDataLength,
      };
    }
  );
  console.log(`get remote data`);
  return remoteData;
}

export const getLocalData = async (type) => {
  const localDataPath = path.join(process.cwd(), `data`, `${type}.json`);
  try {
    if (!fs.existsSync(localDataPath)) {
      console.log(`没有发现本地文件`);
    }
    return JSON.parse(fs.readFileSync(localDataPath)).data;
  } catch (error) {
    console.error(error);
  }
};

function formatData(data, type) {
  let tmpData = [];
  // let tmpImgData = [];
  // let tmpCoverData = [];
  switch (type) {
    case `categories`:
      data.map((item) => {
        let tmp = {};
        tmp.id = item.id;
        tmp.name = item.name;
        tmp.slug = item.slug;
        tmpData.push(tmp);
      });
      return tmpData;
    case `recipes`:
      data.map((item) => {
        let tmp = {};
        tmp.id = item.id;
        tmp.title = item.title?.rendered;
        tmp.slug = item.slug;
        tmp.content = item.content?.rendered;
        tmp.excerpt = item.excerpt?.rendered;
        tmp.categories = item.categories;
        tmp.date_gmt = item.date_gmt;
        tmp.modified_gmt = item.modified_gmt;
        tmp.meta = { description: item.yoast_head_json?.description };
        tmp.featured_media = {
          id: item.featured_media,
          url: item.jetpack_featured_media_url,
        };
        // let coverUrls = item.jetpack_featured_media_url.replace(
        //   /\.(jpg|png|jpeg)\?fit=(\d+)%2C(\d+)&/g,
        //   ".$1?fit=400,400&"
        // );
        // let imgUrls = item.content?.rendered.match(
        //   /src=[\'\"]?(?<url>[^\'\"]*)?[\'\"]/gim
        // );
        // imgUrls = imgUrls
        //   ? imgUrls.map((i) => i.replace(/(src=)|\"/g, ""))
        //   : [];
        // tmpCoverData = tmpCoverData.concat(coverUrls);
        // tmpImgData = tmpImgData.concat(imgUrls);

        tmpData.push(tmp);
      });
      return {
        tmpData,
        // tmpImgData,
        // tmpCoverData,
      };
    default:
      break;
  }
}

export const removeLink = (data) => {
  return data.replace(/(<\/?a[^>]*>)(?!.*\1)/gi, ``);
};

export const getCategoryNameById = async (id) => {
  const categories = await getLocalData(`categories`);
  return categories.filter((cat) => cat.id == id).name;
};
