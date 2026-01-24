import { getWorksList } from "@/app/_libs/microcms";
import WorkList from "@/app/_components/WorkList";
import { WORKS_LIST_LIMIT } from "@/app/_constants";

export default async function Page() {
    const { contents: works } = await getWorksList({
        limit: WORKS_LIST_LIMIT,
    });

    return <WorkList works={works} />;
}
