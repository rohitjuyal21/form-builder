import type { Metadata } from "next";
import "./globals.css";
import { Instrument_Serif, Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

const instrument = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  title: "Peerlist Form Builder",
  description:
    "Build, preview, and share your own customizable forms. Add fields, remove them, and save forms as drafts. Securely store form submissions in MongoDB.",
  openGraph: {
    title: "Peerlist Form Builder",
    description:
      "Build, preview, and share your own customizable forms. Add fields, remove them, and save forms as drafts. Securely store form submissions in MongoDB..",
    url: "https://peerlist-build-form.vercel.app/",
    images: [
      {
        url: "https://peerlist-build-form.vercel.app/ss-1.png",
        alt: "Peerlist Form Builder",
      },
    ],
    siteName: "Peerlist Form Builder",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Peerlist Form Builder",
    creator: "@rohitjuyal21",
    description:
      "Build, preview, and share your own customizable forms. Add fields, remove them, and save forms as drafts. Securely store form submissions in MongoDB.",
    images: {
      url: "https://peerlist-build-form.vercel.app/ss-1.png",
      alt: "Peerlist Form Builder",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${instrument.variable} antialiased`}>
        <div className="lg:max-w-[640px] mx-auto w-full relative min-h-screen h-full flex flex-col">
          {children}
        </div>
        <ToastContainer position="bottom-right" className={"toast-container"} />
      </body>
    </html>
  );
}
