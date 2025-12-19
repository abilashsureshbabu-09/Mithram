'use client';

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BrickWall, Building2, Factory, Ruler, Hammer, PaintBucket, Droplets, HardHat } from "lucide-react";
import { motion } from "framer-motion";

export default function ServicesPage() {
    const services = [
        { icon: Factory, title: "Industrial Constructions", desc: "Specializing in robust factories and industrial plants tailored for productivity.", img: "photo-1581094794329-cd56b507dca0" },
        { icon: Hammer, title: "Maintenance & Renovation", desc: "Upgrading existing structures to meet modern standards and efficiency.", img: "photo-1504307651254-35680f356dfd" },
        { icon: BrickWall, title: "Structural Works", desc: "Strong foundations and structural integrity for all types of buildings.", img: "photo-1626113970860-221665cb19e2" },
        { icon: HardHat, title: "Infra Works", desc: "Developing essential infrastructure with precision and speed.", img: "photo-1486406146926-c627a92ad1ab" },
        { icon: PaintBucket, title: "Interior & Exterior Works", desc: "Aesthetic finishings that bring your space to life.", img: "photo-1618221195710-dd6b41faaea6" },
        { icon: Droplets, title: "Waterproofing", desc: "Advanced solutions to protect your structures from water damage.", img: "photo-1503387762-592deb58ef4e" },
    ];

    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                {/* Header */}
                <section className="bg-zinc-900 text-white py-32 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/50 z-0"></div>
                    <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070" className="absolute inset-0 w-full h-full object-cover -z-10 opacity-40" />
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl font-heading font-bold uppercase mb-4"
                        >
                            Our Services
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-300 max-w-2xl mx-auto"
                        >
                            Comprehensive construction solutions from design to delivery.
                        </motion.p>
                    </div>
                </section>

                {/* Grid */}
                <section className="py-24">
                    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group border border-gray-100 hover:border-[#FDC221] transition-colors bg-white hover:shadow-xl"
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <img src={`https://images.unsplash.com/${s.img}?w=800&q=80`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <s.icon className="text-primary h-12 w-12" />
                                    </div>
                                </div>
                                <div className="p-8 text-center">
                                    <h3 className="text-xl font-heading font-bold uppercase mb-3 text-black">{s.title}</h3>
                                    <p className="text-gray-500 text-sm">{s.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
