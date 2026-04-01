import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Battery Career RPG",
  description: "Gamified battery industry progression map",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
