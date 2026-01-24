import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="siteBody">
        <Header />
        <div className="siteContent">
          <div className="siteContentInner">{children}</div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
