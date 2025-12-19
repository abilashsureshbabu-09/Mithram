'use client';

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Target, Eye, Users, ShieldCheck, Heart, Truck, Ruler, FileText, CheckCircle } from "lucide-react";

export default function AboutPage() {
    const team = [
        { role: "Civil & Structural Engineers", desc: "Designing and supervising strong foundations", icon: Ruler },
        { role: "Architects & Interior Designers", desc: "Creative and functional living spaces", icon: Eye },
        { role: "Electrical & Plumbing Engineers", desc: "Reliable electrical & water systems", icon: CheckCircle },
        { role: "Site Engineers & Fabricators", desc: "Ensuring quality execution on-site", icon: Users },
        { role: "Logistics & Transportation", desc: "On-time delivery of all materials", icon: Truck },
        { role: "Administrative Staff", desc: "Managing operations & client support", icon: FileText },
    ];

    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                {/* Page Header */}
                <div className="bg-zinc-900 text-white py-32 relative">
                    <div className="container mx-auto px-4 relative z-10">
                        <motion.h1
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-5xl font-heading font-bold uppercase border-l-8 border-primary pl-6"
                        >
                            About Us
                        </motion.h1>
                    </div>
                </div>

                {/* Introduction */}
                <section className="py-24 container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="border-8 border-primary p-2">
                                <img src="https://images.unsplash.com/photo-1531834685032-c34bf0d84c7c?q=80&w=1997&auto=format&fit=crop" className="w-full grayscale hover:grayscale-0 transition-all duration-500" />
                            </div>
                            <div className="absolute -bottom-8 -right-8 bg-black text-white p-8 hidden md:block shadow-xl">
                                <h3 className="text-4xl font-heading font-bold text-primary">150+</h3>
                                <p className="uppercase text-sm tracking-wider">Happy Customers</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">Who We Are</span>
                            <h2 className="text-4xl font-heading font-bold uppercase mb-6">Mithram Constructions</h2>
                            <p className="text-gray-500 leading-relaxed mb-6 font-medium text-lg">
                                “Turning dream into reality: Share your project vision with us, We're ready to build!”
                            </p>
                            <p className="text-gray-500 leading-relaxed mb-6">
                                Welcome to Mithram Constructions, your go-to partner for top-notch construction solutions. Backed by years of expertise, we pride ourselves on delivering excellence in residential and commercial projects. At Mithram Constructions our goal is to be your complete solution partner for industrial construction — from structural design and project planning to execution and delivery.
                            </p>

                            <ul className="space-y-4 mb-8">
                                {[
                                    "15+ Years Experience In Industrial Segment",
                                    "Certified & Registered With All Factory Credentials",
                                    "No Sub-Contracting",
                                    "On-Time Delivery"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm font-bold uppercase text-black">
                                        <CheckCircle className="h-5 w-5 text-primary" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="py-24 bg-[#F9F9F9]">
                    <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-12 border-t-4 border-primary shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-6">
                                <Target className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-3xl font-heading font-bold uppercase mb-4">Our Mission</h3>
                            <p className="text-gray-500 leading-relaxed">
                                To provide high-quality, innovative, and sustainable solutions while upholding transparency, ethics, and professionalism in every project we undertake.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-zinc-900 text-white p-12 border-t-4 border-primary shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6">
                                <Eye className="h-8 w-8 text-black" />
                            </div>
                            <h3 className="text-3xl font-heading font-bold uppercase mb-4">Our Vision</h3>
                            <p className="text-gray-400 leading-relaxed">
                                To be a leader in construction and real estate, delivering world-class projects that inspire and endure.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Values */}
                <section className="py-20 bg-primary">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-4xl font-heading font-bold uppercase mb-12 text-black">Our Core Values</h2>
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <div className="bg-white/10 backdrop-blur-sm border border-black/10 p-8 rounded-none">
                                <Heart className="h-10 w-10 text-black mx-auto mb-4" />
                                <h3 className="text-xl font-bold uppercase mb-2">Passion for Excellence</h3>
                                <p className="text-black/70">Delivering high standards in every project.</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm border border-black/10 p-8 rounded-none">
                                <ShieldCheck className="h-10 w-10 text-black mx-auto mb-4" />
                                <h3 className="text-xl font-bold uppercase mb-2">Integrity & Trust</h3>
                                <p className="text-black/70">Building lasting and transparent partnerships.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team */}
                <section className="py-24 container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">Our Strength</span>
                        <h2 className="text-4xl font-heading font-bold uppercase">Meet The Team</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {team.map((member, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white border border-gray-100 p-8 hover:border-primary group transition-colors text-center shadow-sm hover:shadow-md"
                            >
                                <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                                    <member.icon className="h-6 w-6 text-gray-700 group-hover:text-black" />
                                </div>
                                <h3 className="text-lg font-heading font-bold uppercase mb-2">{member.role}</h3>
                                <p className="text-sm text-gray-500">{member.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Partners */}
                <section className="py-24 container mx-auto px-4 bg-white">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-heading font-bold uppercase mb-4">Our Partners</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">An elite list of partners who strengthen our brand promise</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-70">
                        {/* Placeholders for Partner Logos since specific names weren't in text */}
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <motion.div
                                key={i}
                                whileHover={{ opacity: 1, scale: 1.05 }}
                                className="h-32 bg-gray-50 border border-gray-100 flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer"
                            >
                                <span className="font-heading font-bold text-gray-300 text-xl uppercase">Partner {i}</span>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Policies Buttons */}
                <section className="py-12 bg-zinc-100">
                    <div className="container mx-auto px-4 flex flex-wrap justify-center gap-6">
                        <Button variant="outline" className="h-14 px-8 border-2 hover:bg-primary hover:text-black hover:border-primary">
                            Download Health & Safety Policy
                        </Button>
                        <Button variant="outline" className="h-14 px-8 border-2 hover:bg-primary hover:text-black hover:border-primary">
                            Download Quality Policy
                        </Button>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}
