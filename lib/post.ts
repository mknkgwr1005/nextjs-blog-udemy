import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// 現在のフォルダ階層から、postsフォルダの中にあるファイルを読み取る
const postsDirectory = path.join(process.cwd(), "posts");

export function getPostsData() {
  // postsフォルダのファイル名を取得する
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // idをファイル名とする
    const id = fileName.replace(/\.md$/, "");
    // マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  return allPostsData;
}

// getStaticPathでreturnするpathを取得する
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id: string) {
  // mdファイルを探す
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf8");
  // metadataを取得する
  const matterResult = matter(fileContent);
  // 該当するファイルのコンテンツを読み取り、HTMLに変換する
  const blogContent = remark().use(html).process(matterResult.content);
  // 文字列に変換する
  const blogContentHTML = (await blogContent).toString();
  return {
    id,
    blogContentHTML,
    ...matterResult.data,
  };
}
