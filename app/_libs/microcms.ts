import { createClient } from "microcms-js-sdk";
import type {
    MicroCMSQueries,
    MicroCMSImage,
    MicroCMSListContent,
    MicroCMSObjectContent,
} from "microcms-js-sdk";

export type Member = {
    name: string;
    position: string;
    profile: string;
    image: MicroCMSImage;
} & MicroCMSListContent;

export type Category = {
    name : string;
    description: string;
} & MicroCMSListContent;

export type News = {
    title: string;
    description: string;
    content: string;
    thumbnail: MicroCMSImage;
    category: Category;
} & MicroCMSListContent;

export type Work = {
    name: string;
    description: string;
    content: string;
    thumbnail?: MicroCMSImage | null;
} & MicroCMSListContent;

export type ProfileDetail = {
    term?: string | null;
    description?: string | null;
    label?: string | null;
    value?: string | null;
};

export type Profile = {
    name?: string | null;
    title?: string | null;
    description?: string | null;
    summary?: string | null;
    profile?: string | null;
    introduction?: string | null;
    message?: string | null;
    bio?: string | null;
    body?: string | null;
    image?: MicroCMSImage | null;
    profileImage?: MicroCMSImage | null;
    heroImage?: MicroCMSImage | null;
    picture?: MicroCMSImage | null;
    avatar?: MicroCMSImage | null;
    fields?: ProfileDetail[];
    items?: ProfileDetail[];
    details?: ProfileDetail[];
    rows?: ProfileDetail[];
    profileItems?: ProfileDetail[];
    school?: string | null;
    university?: string | null;
    education?: string | null;
    major?: string | null;
    specialty?: string | null;
    learning?: string | null;
    study?: string | null;
    focus?: string | null;
    qualification?: string | null;
} & MicroCMSObjectContent & {
    [key: string]: unknown;
};

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
    throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.MICROCMS_API_KEY) {
    throw new Error("MICROCMS_API_KEY is required");
}

const client = createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: process.env.MICROCMS_API_KEY,
});


export const getNewsList = async (queries?: MicroCMSQueries) => {
    const listData = await client
        .getList<News>({
            endpoint: "news",
            queries,
        });
    return listData;
};

export const getProfile = async (queries?: MicroCMSQueries) => {
    const profileData = await client.getObject<Profile>({
        endpoint: "profile",
        queries,
        customRequestInit: {
            next: {
                revalidate: queries?.draftKey === undefined ? 60 : 0,
            },
        },
    });
    return profileData;
};

export const getNewsDetail = async (
    contentId: string,
    queries?: MicroCMSQueries
) => {
    const detailData = await client.getListDetail<News>({
        endpoint: "news",
        contentId,
        queries,
        customRequestInit: {
            next : {
                revalidate: queries?.draftKey === undefined ? 60 : 0,
            },
        },
    });
    return detailData;
};

export const getWorksList = async (queries?: MicroCMSQueries) => {
    const listData = await client.getList<Work>({
        endpoint: "works",
        queries,
    });
    return listData;
};

export const getWorkDetail = async (
    contentId: string,
    queries?: MicroCMSQueries
) => {
    const detailData = await client.getListDetail<Work>({
        endpoint: "works",
        contentId,
        queries,
        customRequestInit: {
            next: {
                revalidate: queries?.draftKey === undefined ? 60 : 0,
            },
        },
    });
    return detailData;
};

export const getCategoryDetail = async (
    contentId: string,
    queries?: MicroCMSQueries
) => {
    const detailData = await client.getListDetail<Category>({
        endpoint: "categories",
        contentId,
        queries,
    });
    return detailData;
};