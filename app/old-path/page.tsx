import { permanentRedirect } from "next/navigation";
export default function OldPathRedirect() {
    permanentRedirect("/new-path");
    return null;
}