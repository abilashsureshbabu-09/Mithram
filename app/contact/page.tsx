'use client';

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message'),
        };

        try {
            await fetch('/api/leads', { method: 'POST', body: JSON.stringify(data) });
            setSuccess(true);
            (e.target as HTMLFormElement).reset();
        } catch (err) {
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                <div className="bg-zinc-900 text-white py-32 relative">
                    <div className="container mx-auto px-4 relative z-10">
                        <motion.h1
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-5xl font-heading font-bold uppercase border-l-8 border-[#FDC221] pl-6"
                        >Contact Us</motion.h1>
                    </div>
                </div>

                <section className="py-24 container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16">
                        <div>
                            <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">Get In Touch</span>
                            <h2 className="text-4xl font-heading font-bold uppercase mb-8">We'd Love To Hear <br /> From You</h2>

                            <div className="space-y-8 mb-12">
                                {[
                                    { icon: MapPin, title: "Headquarters", info: "No 3 Lakshmi Appadurai Street, Medavakkam, Chennai - 600100" },
                                    { icon: Phone, title: "Phone Number", info: "+91 7200791549" },
                                    { icon: Mail, title: "Email Address", info: "info@mithramconstructions.com" },
                                    { icon: Clock, title: "Working Hours", info: "Mon-Sat: 9am - 7pm" },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex gap-4"
                                    >
                                        <div className="w-12 h-12 bg-primary flex items-center justify-center shrink-0">
                                            <item.icon className="h-5 w-5 text-black" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold uppercase font-heading">{item.title}</h4>
                                            <p className="text-gray-500 w-3/4">{item.info}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gray-50 p-10 border border-gray-200">
                            <h3 className="text-2xl font-heading font-bold uppercase mb-6">Send A Message</h3>
                            {success ? (
                                <div className="bg-green-100 p-6 text-green-700 border border-green-200">
                                    Message sent successfully! We will contact you soon.
                                </div>
                            ) : (
                                <form onSubmit={onSubmit} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold uppercase">Name</label>
                                            <Input name="name" className="bg-white h-12 rounded-none border-gray-300" placeholder="John Doe" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold uppercase">Phone</label>
                                            <Input name="phone" className="bg-white h-12 rounded-none border-gray-300" placeholder="+91 987..." required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase">Email</label>
                                        <Input name="email" type="email" className="bg-white h-12 rounded-none border-gray-300" placeholder="john@example.com" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase">Message</label>
                                        <textarea name="message" className="w-full h-32 p-3 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FDC221]" placeholder="Project details..." required></textarea>
                                    </div>
                                    <Button type="submit" className="w-full h-14 text-lg font-bold" disabled={loading}>
                                        {loading ? "Sending..." : "Submit Message"}
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>
                </section>

                {/* Map Placeholder */}
                <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 font-heading font-bold text-2xl uppercase">Google Map Integration</span>
                </div>
            </main>
            <Footer />
        </>
    );
}
