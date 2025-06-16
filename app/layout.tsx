import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";

const roboto = Roboto({
  weight: "400",
  subsets: [],
});

export const metadata: Metadata = {
  title: "Task Manager",
  description: "내가 쓰려고 만든 Task Manager",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={`${roboto.className}`}>
        <div id='mainWrap'>
          <Navigation />
          <main style={{ flex: 1 }}>{children}</main>
        </div>
      </body>
    </html>
  );
}
