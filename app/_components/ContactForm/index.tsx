"use client";

import { createContact } from "@/app/_actions/contact";
import { useFormState } from "react-dom";
import styles from "./index.module.css";

const initialState = {
    status: "",
    message: "",
};

export default function ContactForm() {
    const [state, formAction] = useFormState(createContact, initialState);
    if (state.status === "success") {
        return (
            <p className={styles.success}>
                お問い合わせいただき、ありがとうございます。
                <br />
                お返事まで今しばらくお待ちください。
            </p>
        );
    }
    return (
        <form className={styles.form} action={formAction}>
            <div className={styles.item}>
                <label className={styles.label} htmlFor="name">
                    お名前 <span className={styles.required}>必須</span>
                </label>
                <input
                    className={styles.textfield}
                    type="text"
                    id="name"
                    name="name"
                    required
                />
            </div>
            <div className={styles.item}>
                <label className={styles.label} htmlFor="email">
                    メールアドレス <span className={styles.required}>必須</span>
                </label>
                <input
                    className={styles.textfield}
                    type="email"
                    id="email"
                    name="email"
                    required
                />
            </div>
            <div className={styles.item}>
                <label className={styles.label} htmlFor="affiliation">
                    ご所属（企業・学校など） <span className={styles.optional}>任意</span>
                </label>
                <input
                    className={styles.textfield}
                    type="text"
                    id="affiliation"
                    name="affiliation"
                />
            </div>
            <div className={styles.item}>
                <label className={styles.label} htmlFor="portfolioUrl">
                    参考URL <span className={styles.optional}>任意</span>
                </label>
                <input
                    className={styles.textfield}
                    type="url"
                    id="portfolioUrl"
                    name="portfolioUrl"
                />
            </div>
            <div className={styles.item}>
                <label className={styles.label} htmlFor="message">
                    お問い合わせ内容 <span className={styles.required}>必須</span>
                </label>
                <textarea
                    className={styles.textarea}
                    id="message"
                    name="message"
                    rows={6}
                    required
                />
            </div>
            <div className={styles.action}>
                {state.status === "error" && (
                    <p className={styles.error}>{state.message}</p>
                )}
                <input type="submit" value="送信する" className={styles.button} />
            </div>
        </form>
    );
}