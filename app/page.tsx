import { permanentRedirect } from "next/navigation";

export default function CatchAll({ params }: { params: { slug: string[] } }) {
  const path = params.slug.join("/");
  if (path === "old-path") permanentRedirect("/new-path");
  return <h1>404</h1>;
}
