import { permanentRedirect } from "next/navigation";

export default function CatchAll({ params }: { params?: { slug?: string[] } }) {
  const path = params?.slug?.join("/") ?? "";
  if (path === "old-path") permanentRedirect("/main");
  return <h1>404</h1>;
}
