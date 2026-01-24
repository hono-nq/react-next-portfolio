import Image from "next/image";
import { getProfile, type Profile } from "@/app/_libs/microcms";
import styles from "./page.module.css";

type ProfileRow = {
    term: string;
    description: string;
};

const resolveProfileName = (profile: Profile) => {
    const candidates = [
        profile.name,
        profile.title,
    ];

    const resolved = candidates.find(
        (value): value is string => typeof value === "string" && value.trim().length > 0,
    );

    return resolved ?? "プロフィール";
};

const resolveProfileSummary = (profile: Profile) => {
    const candidates = [
        profile.summary,
        profile.introduction,
        profile.description,
        profile.profile,
        profile.message,
        profile.bio,
        profile.body,
    ];

    const resolved = candidates.find(
        (value): value is string => typeof value === "string" && value.trim().length > 0,
    );

    return resolved ?? null;
};

const resolveProfileImage = (profile: Profile) => {
    const candidates = [
        profile.image,
        profile.profileImage,
        profile.heroImage,
        profile.picture,
        profile.avatar,
    ];

    const resolved = candidates.find(
        (image): image is { url: string; width?: number; height?: number } =>
            typeof image?.url === "string" && image.url.trim().length > 0,
    );

    return resolved ?? null;
};

const normalizeProfileItems = (profile: Profile): ProfileRow[] => {
    const detailKeys = [
        "fields",
        "items",
        "details",
        "rows",
        "profileItems",
    ] as const;

    for (const key of detailKeys) {
        const detailList = profile[key];
        if (!Array.isArray(detailList)) {
            continue;
        }

        const normalized = detailList
            .map((item) => {
                if (typeof item !== "object" || item === null) {
                    return null;
                }

                const termCandidates = [
                    typeof item.term === "string" ? item.term : null,
                    typeof item.label === "string" ? item.label : null,
                ];
                const descriptionCandidates = [
                    typeof item.description === "string" ? item.description : null,
                    typeof item.value === "string" ? item.value : null,
                ];

                const term = termCandidates.find(
                    (value): value is string => value !== null && value.trim().length > 0,
                );
                const description = descriptionCandidates.find(
                    (value): value is string => value !== null && value.trim().length > 0,
                );

                if (!term || !description) {
                    return null;
                }

                return {
                    term: term.trim(),
                    description: description.trim(),
                } satisfies ProfileRow;
            })
            .filter((item): item is ProfileRow => item !== null);

        if (normalized.length > 0) {
            return normalized;
        }
    }

    const fallbackPairs: ProfileRow[] = [];
    const fallbackSources: Array<[string, unknown]> = [
        ["学校", profile.school ?? profile.university ?? profile.education],
        ["専攻", profile.major ?? profile.specialty],
        ["学んでいること", profile.learning ?? profile.study ?? profile.focus],
        ["資格", profile.qualification],
    ];

    fallbackSources.forEach(([term, value]) => {
        if (typeof value === "string" && value.trim().length > 0) {
            fallbackPairs.push({ term, description: value.trim() });
        }
    });

    return fallbackPairs;
};

export default async function Page() {
    const profile = await getProfile();
    const name = resolveProfileName(profile);
    const summary = resolveProfileSummary(profile);
    const image = resolveProfileImage(profile);
    const items = normalizeProfileItems(profile);

    return (
        <div className={styles.container}>
            <div className={styles.profile}>
                {image ? (
                    <Image
                        src={image.url}
                        alt={`${name}のプロフィール画像`}
                        width={image.width ?? 600}
                        height={image.height ?? 600}
                        className={styles.image}
                    />
                ) : null}
                <div className={styles.content}>
                    <h3 className={styles.name}>{name}</h3>
                    {summary
                        ? summary.includes("<")
                            ? (
                                <div
                                    className={styles.summary}
                                    dangerouslySetInnerHTML={{ __html: summary }}
                                />
                            )
                            : (
                                <p className={styles.summary}>{summary}</p>
                            )
                        : null}
                    {items.length > 0 ? (
                        <dl className={styles.list}>
                            {items.map((item, index) => (
                                <div className={styles.row} key={`${item.term}-${index}`}>
                                    <dt className={styles.term}>{item.term}</dt>
                                    <dd className={styles.description}>{item.description}</dd>
                                </div>
                            ))}
                        </dl>
                    ) : (
                        <p className={styles.description}>プロフィール情報を準備中です。</p>
                    )}
                </div>
            </div>
        </div>
    );
}
