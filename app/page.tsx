'use client';

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, HardHat, Leaf, Headset, ShieldCheck, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { client, urlFor } from "@/lib/sanity";

export default function Home() {
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const stagger = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const query = `*[_type == "project" && status == "completed"] | order(publishedAt desc)[0...3] {
                    _id,
                    title,
                    mainImage,
                    status
                }`;
                const projects = await client.fetch(query);
                setFeaturedProjects(projects);
            } catch (error) {
                console.error("Error fetching featured projects:", error);
            }
        };
        fetchProjects();
    }, []);

    return (
        <>
            <Navbar />
            <main className="flex min-h-screen flex-col overflow-x-hidden">
                {/* Hero Section */}
                <section className="relative w-full min-h-[85vh] h-auto flex items-center py-20 lg:py-0">
                    <div className="absolute inset-0 z-0 bg-neutral-800">
                        <img
                            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
                            alt="Construction"
                            className="w-full h-full object-cover opacity-50"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
                    </div>

                    <div className="container mx-auto px-4 z-10 relative">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <motion.div initial="initial" animate="animate" variants={stagger}>
                                <motion.span variants={fadeInUp} className="bg-primary text-black font-bold px-3 py-1 uppercase text-xs tracking-wider mb-4 inline-block">
                                    Building Your Dream With Trust
                                </motion.span>
                                <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-heading font-bold uppercase leading-none mb-6">
                                    <span className="text-primary">Dreams Into</span> <br />
                                    <span className="text-transparent stroke-text">Concrete</span> <br />
                                    <span className="text-primary">Reality</span>
                                </motion.h1>
                                <motion.p variants={fadeInUp} className="text-gray-300 max-w-xl text-lg mb-8 border-l-4 border-primary pl-6 text-white/90">
                                    From structural design to execution, we create robust, efficient, and future-ready spaces.
                                </motion.p>
                                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                                    <Link href="/projects">
                                        <Button size="lg" className="bg-primary text-black hover:bg-white border-none h-14 font-bold uppercase">View Our Works <ArrowRight className="ml-2 h-4 w-4" /></Button>
                                    </Link>
                                </motion.div>
                            </motion.div>

                            {/* Talk to Expert Form */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="bg-white p-8 border-t-8 border-primary shadow-2xl max-w-md w-full mx-auto lg:ml-auto"
                            >
                                <h3 className="text-2xl font-heading font-bold uppercase mb-2 text-black">Talk to Expert</h3>
                                <p className="text-gray-500 text-sm mb-6">Get a free consultation for your dream project.</p>

                                <LeadForm />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="relative z-20 -mt-24 pb-24">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-0 shadow-2xl"
                        >
                            <div className="bg-white p-10 border-r border-gray-100 hover:shadow-lg transition-all group">
                                <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                                    <Users className="h-8 w-8 text-primary group-hover:text-black" />
                                </div>
                                <h3 className="text-xl font-heading font-bold uppercase mb-3">15+ Years Experience</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    We bring excellent industry solutions and ongoing project support with over 15 years in the industrial segment.
                                </p>
                            </div>
                            <div className="bg-white p-10 border-r border-gray-100 hover:shadow-lg transition-all group">
                                <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                                    <Leaf className="h-8 w-8 text-primary group-hover:text-black" />
                                </div>
                                <h3 className="text-xl font-heading font-bold uppercase mb-3">Eco-Friendly</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Delivering sustainable solutions and adhering to industrial norms with eco-friendly construction practices.
                                </p>
                            </div>
                            <div className="bg-white p-10 hover:shadow-lg transition-all group">
                                <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                                    <ShieldCheck className="h-8 w-8 text-primary group-hover:text-black" />
                                </div>
                                <h3 className="text-xl font-heading font-bold uppercase mb-3">Certified Quality</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Certified & Registered with all credentials. No sub-contracting - we handle everything in-house.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Featured Projects */}
                <section className="py-20 bg-[#F9F9F9]">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-between items-end mb-12">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 className="text-primary font-heading text-4xl font-bold uppercase mb-2">Featured Projects</h2>
                                <p className="text-gray-500">Explore our portfolio of delivered excellence.</p>
                            </motion.div>
                            <Link href="/projects">
                                <Button variant="outline" className="hidden md:flex">View All Projects <ArrowRight className="ml-2 h-4 w-4" /></Button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {featuredProjects.map((project, i) => (
                                <motion.div
                                    key={project._id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="group bg-white rounded-none shadow-sm hover:shadow-xl transition-all"
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        {project.mainImage ? (
                                            <img
                                                src={urlFor(project.mainImage).url()}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                alt={project.title}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-gray-400">No Image</span>
                                            </div>
                                        )}
                                        <span className="absolute top-4 left-4 bg-primary text-xs font-bold px-3 py-1 uppercase">{project.status}</span>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-heading text-xl font-bold uppercase mb-2">{project.title}</h3>
                                        {/* Placeholder location as it's not in schema yet */}
                                        <p className="text-gray-400 text-sm mb-4">📍 Featured Project</p>
                                        <div className="w-full h-[1px] bg-gray-100 mb-4"></div>
                                        <Link href="/projects" className="text-xs font-bold uppercase flex items-center hover:text-primary">
                                            View Project <ArrowRight className="ml-2 h-3 w-3" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 bg-primary text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="container mx-auto px-4"
                    >
                        <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase mb-6 text-black">
                            Ready to Build Your Dream?
                        </h2>
                        <p className="text-black/80 max-w-2xl mx-auto mb-10 text-lg">
                            Share your project vision with us. We're ready to build!
                        </p>
                        <Link href="/contact">
                            <Button variant="secondary" size="lg" className="bg-white text-black hover:bg-black hover:text-white border-none min-w-[200px] h-14 text-lg">
                                Get In Touch
                            </Button>
                        </Link>
                    </motion.div>
                </section>

            </main>
            <Footer />
        </>
    );
}

function LeadForm() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('loading');

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'), // Maps to Whatsapp Number
            email: "no-email@provided.com", // Default as form doesn't ask for email
            service: formData.get('service'),
            message: formData.get('message'),
        };

        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (res.ok) {
                setStatus('success');
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {status === 'success' && (
                <div className="bg-green-100 text-green-700 p-3 text-sm font-bold border border-green-200">
                    Message sent successfully! We will contact you soon.
                </div>
            )}
            {status === 'error' && (
                <div className="bg-red-100 text-red-700 p-3 text-sm font-bold border border-red-200">
                    Something went wrong. Please try again.
                </div>
            )}

            <div>
                <input
                    name="name"
                    placeholder="Your Name"
                    required
                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary transition-colors"
                />
            </div>
            <div>
                <input
                    name="phone"
                    placeholder="Whatsapp Number"
                    required
                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary transition-colors"
                />
            </div>
            <div>
                <select
                    name="service"
                    required
                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary transition-colors text-gray-600"
                >
                    <option value="" disabled selected>Select Service</option>
                    <option value="Industrial Construction">Industrial Construction</option>
                    <option value="Residential Construction">Residential Construction</option>
                    <option value="Commercial Projects">Commercial Projects</option>
                    <option value="Renovation">Renovation</option>
                    <option value="Interiors">Interiors</option>
                </select>
            </div>
            <div>
                <textarea
                    name="message"
                    placeholder="Your Message"
                    required
                    className="w-full h-24 p-4 bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#FDC221] transition-colors resize-none"
                ></textarea>
            </div>
            <Button type="submit" className="w-full h-12 font-bold uppercase" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending...' : 'Submit Request'}
            </Button>
        </form>
    );
}
