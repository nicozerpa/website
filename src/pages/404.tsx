export default function NotFound() : JSX.Element {
    if (typeof window !== "undefined") {
        window.location.replace("/");
    }

    return null;
}