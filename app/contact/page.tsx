import styles from "./page.module.css";
import ContactForm from "@/app/_components/ContactForm";

export default function Page() {
    return (
        <div className={styles.container}>
            <p className={styles.text}>
                ご質問、ご相談がありましたら下記フォームよりお問い合わせください。
            </p>
            <ContactForm />
        </div>
    );
}