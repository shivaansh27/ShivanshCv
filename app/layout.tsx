import type { Metadata } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Shivansh Sharma | Full Stack Developer & AI Enthusiast",
  description:
    "Backend & Platform Engineer building scalable APIs, real-time systems, and AI-powered applications using Node.js, TypeScript, and modern cloud architecture.",
  metadataBase: new URL("https://www.shivanshsharma.site"),
  alternates: {
    canonical: "https://www.shivanshsharma.site",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Shivansh Sharma | Full Stack Developer & AI Enthusiast",
    description:
      "Backend & Platform Engineer building scalable APIs, real-time systems, and AI-powered applications.",
    url: "https://www.shivanshsharma.site",
    siteName: "Shivansh Sharma",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Shivansh Sharma Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivansh Sharma | Full Stack Developer & AI Enthusiast",
    description:
      "Full Stack & AI Engineer building scalable systems and intelligent applications.",
    images: ["/og-image.svg"],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Shivansh Sharma",
              url: "https://www.shivanshsharma.site",
              jobTitle: "Backend & AI Engineer",
              sameAs: [
                "https://github.com/shivaansh27",
                "https://www.linkedin.com/in/shivanshsharma27/",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans bg-background text-foreground selection:bg-foreground selection:text-background`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}