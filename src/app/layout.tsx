import Footer from "@/components/footer/Footer";
import HeaderDesktop from "@/components/header/HeaderDesktop";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="w-full flex flex-col justify-around space-y-2 bg-gray-100">
        <HeaderDesktop />
        <main className="max-w-6xl m-auto w-full h-[86vh] 2xl:h-[88vh] overflow-y-scroll flex justify-start flex-col items-start">
          {children}
        </main>
        <div className=" fixed w-full bottom-0">
          <Footer />
        </div>
      </body>
    </html>
  );
}
