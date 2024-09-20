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
  title: "Ayush's Portfolio",
  description: "A Backend Developer Ayush's Portfolio.",
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
