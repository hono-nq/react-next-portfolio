import type { Category as CategoryType } from "@/app/_libs/microcms";
import styles from "./index.module.css";

type Props = {
    category?: CategoryType | null;
};

export default function Category({ category }: Props) {
    const label = category?.name ?? "未分類"; // fall back when the API omits category
    return <span className={styles.tag}>{label}</span>;
}