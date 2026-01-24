import Sheet from "@/app/_components/Sheet";
import Hero from "@/app/_components/Hero";

type Props = {
    children: React.ReactNode;
};

export default function ProfileLayout({ children }: Props) {
    return (
        <>
            <Hero title="Profile" sub="自己紹介" />
            <Sheet>{children}</Sheet>
        </>
    )
}
