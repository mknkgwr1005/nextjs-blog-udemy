import Image from "next/image";
import styles from "./layoutcss.module.sass"; // layout限定のstyle
import utilStyles from "../styles/utils.module.sass"; // 共通して使いたいstyle
import { ReactNode } from "react";
import Link from "next/link";

export const PageTitle = "Next.js Blog";

/**
 * Header部分
 * @param param0
 * @returns
 */
export const Layout: React.FC<{ children?: ReactNode; home?: ReactNode }> = ({
  children,
  home,
}) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`}
              src="/tanuki.png"
              alt="Tanuki"
              width={100} //必須
              height={100}
            />
            <h1 className={utilStyles.heading2Xl}>Mika Code</h1>
          </>
        ) : (
          <>
            <Image
              className={`${utilStyles.borderCircle}`}
              src="/tanuki.png"
              alt="Tanuki"
              width={100} //必須
              height={100}
            />
            <h1 className={utilStyles.heading2Xl}>Mika Code</h1>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div>
          <Link href="/">←　ホームへ戻る</Link>
        </div>
      )}
    </div>
  );
};
