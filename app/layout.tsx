import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import CursorEffect from "./_components/CursorEffect";
import {
  Kosugi_Maru,
  Mochiy_Pop_P_One,
  Roboto_Slab,
} from "next/font/google";

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-roboto-slab",
});

const kosugiMaru = Kosugi_Maru({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-kosugi-maru",
});

const mochiyPop = Mochiy_Pop_P_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mochiy-pop",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${robotoSlab.variable} ${kosugiMaru.variable} ${mochiyPop.variable} siteBody`}
      >
        <CursorEffect />
        <Header />
        <div className="siteContent">
          <div className="siteContentInner">{children}</div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
