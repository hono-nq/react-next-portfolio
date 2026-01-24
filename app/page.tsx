import Image from "next/image";
import { getNewsList } from "@/app/_libs/microcms";
import { TOP_NEWS_LIMIT } from "@/app/_constants";
import ButtonLink from "@/app/_components/ButtonLink";
import NewsList from "./_components/NewsList";
import styles from "./page.module.css";

export const revalidate = 60;

export default async function Home() {
  const newsList = await getNewsList({
    limit: TOP_NEWS_LIMIT,
  });

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroName}>Honoka Yoshitake</h1>
          <p className={styles.heroLead}>
            私のポートフォリオサイトへようこそ！
            <br />
            Welcome to my portfolio site!
          </p>
          <div className={styles.heroActions}>
            <ButtonLink href="/profile">プロフィールを見る</ButtonLink>
            <ButtonLink href="/contact">お問い合わせ</ButtonLink>
          </div>
        </div>
      </section>

      <section className={styles.sectionWide} id="news">
        <div className={styles.sectionHeader}>
          <p className={styles.sectionKicker}>News</p>
          <h2 className={styles.sectionTitle}>活動のお知らせ</h2>
        </div>
        <div className={styles.newsWrapper}>
          <NewsList news={newsList.contents} />
        </div>
        <div className={styles.sectionFooter}>
          <ButtonLink href="/news">ニュース一覧を見る</ButtonLink>
        </div>
      </section>
    </main>
  );
}