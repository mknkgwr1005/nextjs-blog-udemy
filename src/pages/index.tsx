import { Layout, PageTitle } from "@/components/Layout";
import "../styles/global.sass";
import utilStyle from "../styles/utils.module.sass";
import homeStyle from "../styles/home.module.sass";
import Link from "next/link";
import Image from "next/image";
import { getPostsData } from "../../lib/post";
import Head from "next/head";

// SSG読み取り
export async function getStaticProps() {
  const allPostsData = getPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

type PostDataType = {
  id: string;
  title: string;
  date: string;
  thumbnail: string;
};

type HomeProps = {
  allPostsData: PostDataType[];
};

export default function Home({ allPostsData }: HomeProps) {
  return (
    <Layout home>
      <Head>
        <title>{PageTitle}</title>
      </Head>
      <section className={utilStyle.headingMd}>
        <p>私はラクスパートナーズのエンジニアです。</p>
      </section>
      <br />

      <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
        <h2 className={utilStyle.headingXl}>😎 Engineer Blog</h2>
        <div className={homeStyle.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <Image
                  className={homeStyle.thumbnailImage}
                  src={thumbnail}
                  alt={title}
                  width={1000}
                  height={1000}
                />
              </Link>
              <a href={`/${id}`} className={utilStyle.boldText}>
                {title}
              </a>
              <br />
              <small className={utilStyle.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
