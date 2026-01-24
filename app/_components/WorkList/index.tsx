import Image from "next/image";
import Link from "next/link";

import styles from "./index.module.css";
import type { Work } from "@/app/_libs/microcms";

type Props = {
    works: Work[];
};

export default function WorkList({ works }: Props) {
    if (works.length === 0) {
        return <p>制作実績がありません。</p>;
    }

    return (
        <ul>
            {works.map((work) => (
                <li key={work.id} className={styles.list}>
                    <Link href={`/works/${work.id}`} className={styles.link}>
                        {work.thumbnail ? (
                            <Image
                                src={work.thumbnail.url}
                                alt=""
                                className={styles.image}
                                width={work.thumbnail.width}
                                height={work.thumbnail.height}
                            />
                        ) : (
                            <Image
                                src="/no-image.png"
                                alt="No Image"
                                className={styles.image}
                                width={1200}
                                height={630}
                            />
                        )}
                        <dl className={styles.contents}>
                            <dt className={styles.title}>{work.name}</dt>
                            <dd className={styles.description}>{work.description}</dd>
                        </dl>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
