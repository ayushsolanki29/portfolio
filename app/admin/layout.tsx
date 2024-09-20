import type { Metadata } from "next";
import Sidebar from "./_components/Sidebar";

export const metadata: Metadata = {
  title: "Dashboard ",
  description: "A Backend Developer Ayush's Portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex w-full">
      <Sidebar />
      <div className="flex-1 mt-10">{children}</div>
    </main>
  );
}
