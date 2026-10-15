import "./globals.css";
import Footer from "@/components/footer/footer";
import { Cursor } from "@/utils/cursor";
import { getHeroProjects } from "@/sanity/queries";

export async function generateMetadata() {
  let ogImage = "/favicon.png";
  try {
    const projects = await getHeroProjects();
    if (projects.length > 0 && projects[0].img) {
      ogImage = projects[0].img;
    }
  } catch {
    // Fall back to favicon if Sanity is unreachable
  }

  return {
    title: "giovanni sotomayor",
    description: "photography and works by giovanni sotomayor.",
    icons: {
      icon: "/favicon.png",
    },
    openGraph: {
      title: "giovanni sotomayor",
      description: "photography and works by giovanni sotomayor.",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "giovanni sotomayor portfolio",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.giovannisotomayor.com"),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Cursor />
        {children}
        <Footer />
      </body>
    </html>
  );
}
