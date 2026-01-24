import Image from "next/image";
import type { Work } from "@/app/_libs/microcms";
import styles from "./index.module.css";

type Props = {
    data: Work;
};

export default function WorkArticle({ data }: Props) {
    const contentHtml = typeof data.content === "string" ? data.content : "";

    return (
        <main>
            <h1 className={styles.title}>{data.name}</h1>
            <p className={styles.description}>{data.description}</p>
            {data.thumbnail ? (
                <Image
                    src={data.thumbnail.url}
                    alt=""
                    className={styles.thumbnail}
                    width={data.thumbnail.width}
                    height={data.thumbnail.height}
                />
            ) : null}
            {contentHtml ? (
                <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
            ) : null}
        </main>
    );
}
