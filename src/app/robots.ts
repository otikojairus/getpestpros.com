import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://getpestpros.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/wp-content/uploads/",
          "/wp-content/themes/",
          "/*/*.js",
          "/*/*.css",
          "/wp-*.png",
          "/wp-*.jpg",
          "/wp-*.jpeg",
          "/wp-*.gif",
          "/wp-*.svg",
          "/wp-*.pdf",
        ],
        disallow: [
          "/cgi-bin",
          "/wp-",
          "/?s=",
          "*&s=",
          "/author/",
          "*?attachment_id=",
          "*/feed",
          "*/rss",
          "*/embed",
        ],
      },
      {
        userAgent: "facebookexternalhit",
        allow: "/",
      },
      {
        userAgent: "Twitterbot",
        allow: "/",
      },
      {
        userAgent: "LinkedInBot",
        allow: "/",
      },
      {
        userAgent: "WhatsApp",
        allow: "/",
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Bingbot",
        allow: [""],
      },
    ],
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}
