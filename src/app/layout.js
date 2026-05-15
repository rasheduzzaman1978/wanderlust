import { Josefin_Sans } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { Toaster } from "react-hot-toast";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-josefin",
});

export const metadata = {
  title: "Wanderlust",
  description: "Explore beautiful travel destinations around the world",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
        data-scroll-behavior="smooth"
      className={`${josefin.variable} scroll-smooth`}
    >
      <body className="flex min-h-screen flex-col bg-gray-50 font-sans antialiased">

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <Footer />

        {/* Toast */}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 1500,
          }}
        />

      </body>
    </html>
  );
}