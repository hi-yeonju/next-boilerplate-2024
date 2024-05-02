import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/reset.css";
import CustomProvider from "@/provider/CustomProvider";

const noto = Noto_Sans_KR({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "next boilerplate",
  description: "next boilerplate",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
  params: { session, ...params},
}: Readonly<{
  children: React.ReactNode;
  params:any
}>) {
  return (
    <html lang="ko">
      <body className={noto.className}>
        <CustomProvider session={session}>
          {children}
        </CustomProvider>
      </body>
    </html>
  );
}
