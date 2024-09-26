// @ts-nocheck
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider";
import { Toaster } from "react-hot-toast";
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"], // include weights you want to use
  style: ["normal"], // include styles you want to use
  variable: "--poppins-font-family", // define your custom CSS variable

  variants: {
    normal: {
      fontWeight: "400", // normal weight
    },
    bold: {
      fontWeight: "700", // bold weight
    },
  },
  defaultVariant: "normal", // set the default variant
});

export const metadata: Metadata = {
  title: "Ayush Solanki | Backend Developer & Freelancer",
  description: "I'm Ayush Solanki, a Backend Developer specializing in Next.js, MERN Stack, and PHP. I've been freelancing for over two years, providing expert web development services.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ayushsolanki.site/", // Update with your actual portfolio URL
    title: "Ayush Solanki | Backend Developer & Freelancer",
    description: "Experienced Backend Developer specializing in Next.js, MERN Stack, and PHP. Available for freelance projects.",
    images: [
      {
        url: "https://ayushsolanki.site/og-image.jpg", // Update with your actual OG image URL
        width: 1200,
        height: 630,
        alt: "Ayush Solanki's Portfolio",
      },
    ],
    site_name: "Ayush Solanki's Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    site: "@ayushsolanki.exe", // Your Twitter handle
    title: "Ayush Solanki | Backend Developer & Freelancer",
    description: "Next.js, MERN Stack, and PHP backend developer with over 2 years of freelancing experience.",
    image: "https://ayushsolanki.site/og-image.jpg", // Update with the Twitter-specific image
  },
  canonical: "https://ayushsolanki.site/", // Canonical URL for SEO
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <main className="relative bg-black-100 h-full flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
          <div className="max-w-7xl w-full">
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </div>
        </main>
      </body>
    </html>
  );
}
