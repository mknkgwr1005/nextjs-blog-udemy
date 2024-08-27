import { Layout } from "@/components/Layout";
import { getAllPostIds, getPostData } from "../../../lib/post";
import utilStyles from "../../styles/utils.module.sass";
import Head from "next/head";
// SSGでファイルのパスを取得して返す
export async function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths, //getAllPostIdsから取得したparams
    fallback: false, // 404errorを表示する
  };
}

// `params` の型定義
type ParamsType = {
  id: string;
};

// `postData` の型定義
type PostDataType = {
  id: string;
  blogContentHTML: string;
  title?: string;
  date?: string;
};

// `getStaticProps` の引数と戻り値の型定義
type PostStaticProps = {
  params: ParamsType;
};

// 外部ファイルを読み取る
export async function getStaticProps({
  params, //getAllPostIdsから取得したparams
}: PostStaticProps): Promise<{ props: { postData: PostDataType } }> {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}

type PostProps = {
  postData: PostDataType;
};

export default function Post({ postData }: PostProps) {
  // コンポーネントのエクスポートを修正
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <br />
        <div className={utilStyles.lightText}>{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }} />
      </article>
    </Layout>
  );
}
