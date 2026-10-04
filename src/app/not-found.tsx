import Link from "next/link";

export default function NotFound() {
  return <section><h1 className="page-title">This page has no decisions attached.</h1><Link href="/">Return home</Link></section>;
}
