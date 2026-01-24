import { notFound } from "next/navigation";
import { getWorkDetail } from "@/app/_libs/microcms";
import WorkArticle from "@/app/_components/WorkArticle";
import ButtonLink from "@/app/_components/ButtonLink";
import styles from "./page.module.css";

type Props = {
    params: {
        slug: string;
    };
    searchParams: {
        dk?: string;
    };
};

export default async function Page({ params, searchParams }: Props) {
    const data = await getWorkDetail(params.slug, {
        draftKey: searchParams.dk,
    }).catch(notFound);

    return (
        <>
            <WorkArticle data={data} />
            <div className={styles.footer}>
                <ButtonLink href="/works">制作実績一覧へ</ButtonLink>
            </div>
        </>
    );
}
