import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#1A1A1A] text-white pt-20 pb-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Column 1: Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <img src="/logo.png" alt="Mithram Constructions" className="h-16 w-auto object-contain filter brightness-0 invert" />
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Building your dream with trust, quality & innovation. From construction to smart interiors – we deliver excellence at every step.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-black transition-colors">
                                    <Icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="font-heading font-bold uppercase text-lg mb-6 border-l-4 border-primary pl-3">Quick Links</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/projects" className="hover:text-primary transition-colors">Projects</Link></li>
                            <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div>
                        <h4 className="font-heading font-bold uppercase text-lg mb-6 border-l-4 border-primary pl-3">Contact Us</h4>
                        <ul className="space-y-6 text-sm text-gray-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary shrink-0" />
                                <span>No 3 Lakshmi Appadurai Street<br />Medavakkam, Chennai - 600100</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-primary shrink-0" />
                                <span>+91 7200791549</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary shrink-0" />
                                <span>info@mithramconstructions.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter */}
                    <div>
                        <h4 className="font-heading font-bold uppercase text-lg mb-6 border-l-4 border-primary pl-3">Newsletter</h4>
                        <p className="text-gray-400 text-sm mb-6">Subscribe to get the latest news and updates.</p>
                        <div className="flex gap-2">
                            <Input placeholder="Your Email Address" className="bg-white/5 border-none text-white placeholder:text-gray-500 h-12" />
                            <Button className="h-12 w-12 p-0"><ArrowRight className="h-4 w-4" /></Button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>© 2025 Mithram Constructions. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="#">Privacy Policy</Link>
                        <Link href="#">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
