import type { Metadata } from "next";
import { Oswald, Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"], variable: "--font-roboto" });

export const metadata: Metadata = {
    title: "Mithram Constructions",
    description: "Building Dreams into Concrete Reality",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body suppressHydrationWarning className={cn(
                "min-h-screen bg-background font-sans antialiased",
                oswald.variable,
                roboto.variable
            )}>{children}</body>
        </html>
    );
}
