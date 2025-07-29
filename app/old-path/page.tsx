import { permanentRedirect } from "next/navigation";
export default function OldPathRedirect() {
    permanentRedirect("/main");
    return null;
}