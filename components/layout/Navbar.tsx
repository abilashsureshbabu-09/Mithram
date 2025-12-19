'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const menuVariants = {
        closed: {
            opacity: 0,
            x: "100%",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        },
        open: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        }
    };

    const linkVariants = {
        closed: { opacity: 0, y: 20 },
        open: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
            }
        })
    };

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About Us" },
        { href: "/services", label: "Services" },
        { href: "/projects", label: "Projects" },
        { href: "/blogs", label: "Blog" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <>
            {/* Top Info Bar */}
            <div className="bg-[#1A1A1A] text-white py-2 px-4 hidden md:block">
                <div className="container mx-auto flex justify-between items-center text-xs tracking-wider">
                    <div className="flex gap-6">
                        <span>📞 +91 7200791549</span>
                        <span>✉️ info@mithramconstructions.com</span>
                    </div>
                    <div className="flex gap-4">
                        <span>RESIDENTIAL</span>
                        <span>•</span>
                        <span>COMMERCIAL</span>
                        <span>•</span>
                        <span>INDUSTRIAL</span>
                    </div>
                </div>
            </div>

            <nav className="sticky top-0 w-full z-50 bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/Mithram/logo.png" alt="Mithram Constructions" className="h-16 w-auto object-contain" />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-bold uppercase hover:text-primary transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/contact" className="hidden md:block">
                            <Button className="font-bold">GET A QUOTE</Button>
                        </Link>

                        {/* Mobile Menu Button - "Three-line icon" */}
                        <button
                            className="md:hidden text-black focus:outline-none"
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={menuVariants}
                            className="fixed inset-0 top-20 z-40 bg-white flex flex-col items-center justify-start pt-12 md:hidden h-[calc(100vh-5rem)] border-t"
                        >
                            <div className="flex flex-col items-center gap-8 text-xl font-bold uppercase">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.href}
                                        custom={i}
                                        variants={linkVariants}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={toggleMenu}
                                            className="hover:text-primary transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                                <motion.div
                                    custom={navLinks.length}
                                    variants={linkVariants}
                                    className="mt-4"
                                >
                                    <Link href="/contact" onClick={toggleMenu}>
                                        <Button className="font-bold w-48 h-12">GET A QUOTE</Button>
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
}
