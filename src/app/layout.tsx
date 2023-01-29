import Footer from "@/components/footer/Footer";
import HeaderDesktop from "@/components/header/HeaderDesktop";
import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="w-full flex flex-col space-y-2">
        <HeaderDesktop />
        <main className="max-w-6xl m-auto w-full h-[88vh] overflow-y-scroll flex justify-start flex-col items-start">
          {children}
        </main>
        <div className=" fixed w-full bottom-0">
          <Footer />
        </div>
      </body>
    </html>
  );
}
