import type { Metadata } from "next";
import { Radio_Canada } from "next/font/google";

const inter = Radio_Canada({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Novu Feed | Lichess",
  description: "A replica of Lichess feed using Novu ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
