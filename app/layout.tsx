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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={`${roboto.className}`}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
