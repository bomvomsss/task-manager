import type { Metadata } from "next";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import { TodoProvider } from "./context/TodoContext";

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
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap'
          rel='stylesheet'
        />
      </head>
      <body>
        <TodoProvider>
          <div id='mainWrap'>
            <Navigation />
            <main style={{ flex: 1 }}>{children}</main>
          </div>
        </TodoProvider>
      </body>
    </html>
  );
}
