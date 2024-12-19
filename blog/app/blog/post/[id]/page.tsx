import Link from "next/link";
export default async function Post({ params }: any) {
  const { id } = await params;
  return (
    <div>
      <h3>Post #{id}</h3>
      <p>Lorem ipsum</p>
      <Link href="/blog">Back to blog</Link>
    </div>
  );
}
