import Link from "next/link";
export default function Home() {
  return (
    <div>
      <p>This is our homepage</p>
      <div>
        <Link href="/blog">Blog</Link>
      </div>
    </div>
  );
}
