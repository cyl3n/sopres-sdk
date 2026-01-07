import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "soPres Next.js Starter",
  description: "A Next.js 14 starter template powered by soPres",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen flex flex-col">
          <header className="border-b">
            <nav className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <a href="/" className="text-xl font-bold">
                  soPres
                </a>
                <div className="flex gap-6">
                  <a href="/" className="hover:underline">
                    Home
                  </a>
                  <a href="/blog" className="hover:underline">
                    Blog
                  </a>
                </div>
              </div>
            </nav>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t mt-auto">
            <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600">
              Powered by{" "}
              <a
                href="https://github.com/vitecms"
                className="font-medium hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                soPres
              </a>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
