import './globals.css'
 import prisma from "../lib/prisma";

 export default async function RootLayout({
   children,
 }: {
   children: React.ReactNode;
 }) {
   const user = await prisma.user.findMany();
   console.log("pppp", user);

   return (
     <html lang="en">
       <head />
       <body>{children}</body>
     </html>
   );
 }
