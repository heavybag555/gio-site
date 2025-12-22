import "./globals.css";
import Footer from "@/components/footer/footer";
import { Cursor } from "@/utils/cursor";

export const metadata = {
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
        url: "/update-photos/001- 35mm - 400 Portra Pyrenees /Select for connor.jpg",
        width: 1200,
        height: 630,
        alt: "giovanni sotomayor portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

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
