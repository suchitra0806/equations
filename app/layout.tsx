import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif-display",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "∑ explain — Equation Beautifier & Explainer",
  description:
    "Paste any mathematical or scientific equation and get a beautiful rendering plus plain-English explanations for every symbol.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${dmSerifDisplay.variable} font-body antialiased bg-[color:var(--bg-primary)] text-[color:var(--text-primary)]`}
      >
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              backgroundColor: "#13101E",
              color: "#F0ECFF",
              border: "1px solid #3D3560",
            },
          }}
        />
      </body>
    </html>
  );
}
