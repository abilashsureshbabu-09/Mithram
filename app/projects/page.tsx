'use client';

export const dynamic = 'force-dynamic';

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { client } from "@/lib/sanity";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { urlFor } from "@/lib/sanity";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ProjectsPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const query = `*[_type == "project"] | order(publishedAt desc) {
                    _id,
                    title,
                    slug,
                    status,
                    publishedAt,
                    mainImage,
                    description
                }`;
                const result = await client.fetch(query);
                setProjects(result);
            } catch (e) {
                console.error("Error fetching projects:", e);
                setProjects([]);
            }
        };
        fetchProjects();
    }, []);

    const filteredProjects = projects.filter(project => {
        if (filter === 'all') return true;
        return project.status === filter;
    });

    const tabs = [
        { id: 'all', label: 'All Projects' },
        { id: 'ongoing', label: 'Ongoing' },
        { id: 'completed', label: 'Completed' },
    ];

    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                <div className="bg-zinc-900 text-white py-32 relative">
                    <div className="container mx-auto px-4 relative z-10">
                        <h1 className="text-5xl font-heading font-bold uppercase border-l-8 border-[#FDC221] pl-6">Our Projects</h1>
                    </div>
                </div>

                <section className="py-24 container mx-auto px-4">
                    {/* Tabs */}
                    <div className="flex justify-center mb-12">
                        <div className="bg-gray-100 p-1 rounded-full inline-flex">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setFilter(tab.id)}
                                    className={`px-8 py-3 rounded-full text-sm font-bold uppercase transition-all ${filter === tab.id
                                        ? 'bg-primary text-black shadow-lg scale-105'
                                        : 'text-gray-500 hover:text-black'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredProjects.length === 0 ? (
                            <p className="col-span-full text-center text-gray-500">No projects found for this category.</p>
                        ) : filteredProjects.map((project: any) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                key={project._id}
                                className="group bg-white border border-gray-100 hover:shadow-xl transition-all"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    {project.mainImage && (
                                        <img
                                            src={urlFor(project.mainImage).url()}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            alt={project.title}
                                        />
                                    )}
                                    <span className="absolute top-4 left-4 bg-primary text-xs font-bold px-3 py-1 uppercase">{project.status}</span>
                                </div>
                                <div className="p-8">
                                    <h3 className="font-heading text-xl font-bold uppercase mb-2 line-clamp-2 min-h-[56px]">{project.title}</h3>
                                    <p className="text-gray-400 text-sm mb-4 capitalize">{project.status} Project</p>
                                    <div className="w-full h-[1px] bg-gray-100 mb-4"></div>
                                    <Link href={`/projects/${project.slug.current}`} className="text-xs font-bold uppercase flex items-center hover:text-[#FDC221]">
                                        View Details <ArrowRight className="ml-2 h-3 w-3" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>
            </main>
            <Footer />
        </>
    );
}
