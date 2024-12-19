const BLOG_URL = 'https://remote-app-two.vercel.app';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['chhcpportalode4.prod.acquia-sites.com'],
  },
  async rewrites() {
    return [
      {
        source: "/news",
        destination: `${BLOG_URL}/news`,
      },
      {
        source: "/blog",
        destination: `${BLOG_URL}/blog`,
      },
      {
        source: "/blog/:path+",
        destination: `${BLOG_URL}/blog/:path+`,
      },
      {
        source: "/blog-static/_next/:path+",
        destination: `${BLOG_URL}/blog-static/_next/:path+`,
      },
    ];
  },
};

module.exports = nextConfig;
