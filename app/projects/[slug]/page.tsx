'use client';

export const dynamic = 'force-dynamic';

import { client, urlFor } from "@/lib/sanity";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Briefcase, CheckCircle, Clock } from "lucide-react";

export default function ProjectDetailsPage() {
    const { slug } = useParams();
    const [project, setProject] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            if (!slug) return;
            try {
                const query = `*[_type == "project" && slug.current == $slug][0] {
                    title,
                    status,
                    mainImage,
                    gallery,
                    client,
                    description,
                    requirements,
                    roadmap,
                    publishedAt
                }`;
                const data = await client.fetch(query, { slug });
                setProject(data);
            } catch (error) {
                console.error("Error fetching project:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProject();
    }, [slug]);

    if (isLoading) return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FDC221]"></div>
        </div>
    );

    if (!project) return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold">Project not found</h1>
            </div>
            <Footer />
        </>
    );

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-white">
                {/* Hero Section */}
                <div className="relative h-[60vh] w-full">
                    <div className="absolute inset-0 bg-black/50 z-10"></div>
                    {project.mainImage && (
                        <img
                            src={urlFor(project.mainImage).url()}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                    )}
                    <div className="absolute bottom-0 left-0 w-full z-20 pb-12">
                        <div className="container mx-auto px-4">
                            <span className="bg-primary text-black font-bold px-3 py-1 uppercase text-xs tracking-wider mb-4 inline-block">
                                {project.status} Project
                            </span>
                            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white uppercase">{project.title}</h1>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Description */}
                            <section>
                                <h2 className="text-2xl font-heading font-bold uppercase mb-6 border-l-4 border-[#FDC221] pl-4">Project Overview</h2>
                                <div className="prose max-w-none text-gray-600">
                                    <PortableText value={project.description} />
                                </div>
                            </section>

                            {/* Requirements */}
                            {project.requirements && (
                                <section>
                                    <h2 className="text-2xl font-heading font-bold uppercase mb-6 border-l-4 border-[#FDC221] pl-4">Requirements</h2>
                                    <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                                        <div className="prose max-w-none text-gray-600">
                                            <PortableText value={project.requirements} />
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Gallery */}
                            {project.gallery && project.gallery.length > 0 && (
                                <section>
                                    <h2 className="text-2xl font-heading font-bold uppercase mb-6 border-l-4 border-[#FDC221] pl-4">Project Gallery</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {project.gallery.map((image: any, index: number) => (
                                            <div key={index} className="relative h-64 overflow-hidden rounded-lg cursor-pointer group">
                                                <img
                                                    src={urlFor(image).url()}
                                                    alt={`Gallery ${index + 1}`}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            {/* Client Details Card */}
                            {project.client && (
                                <div className="bg-white shadow-xl p-8 border-t-4 border-[#FDC221]">
                                    <h3 className="text-xl font-heading font-bold uppercase mb-6">Client Details</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start">
                                            <Briefcase className="w-5 h-5 text-primary mt-1 mr-3" />
                                            <div>
                                                <p className="text-xs text-gray-400 uppercase font-bold">Client Name</p>
                                                <p className="font-semibold">{project.client.name}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <CheckCircle className="w-5 h-5 text-primary mt-1 mr-3" />
                                            <div>
                                                <p className="text-xs text-gray-400 uppercase font-bold">Industry</p>
                                                <p className="font-semibold">{project.client.industry}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <MapPin className="w-5 h-5 text-primary mt-1 mr-3" />
                                            <div>
                                                <p className="text-xs text-gray-400 uppercase font-bold">Location</p>
                                                <p className="font-semibold">{project.client.location}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Roadmap / Timeline */}
                            {project.roadmap && project.roadmap.length > 0 && (
                                <div className="bg-zinc-900 text-white p-8">
                                    <h3 className="text-xl font-heading font-bold uppercase mb-6 text-primary">Project Roadmap</h3>
                                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                                        {project.roadmap.map((phase: any, index: number) => (
                                            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-zinc-900 group-[.is-active]:bg-primary text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                                    <Clock className="w-5 h-5 text-black" />
                                                </div>
                                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-zinc-700 bg-zinc-800 shadow">
                                                    <div className="flex items-center justify-between space-x-2 mb-1">
                                                        <div className="font-bold text-white">{phase.title}</div>
                                                        <time className="font-caveat font-medium text-primary text-xs">{phase.date}</time>
                                                    </div>
                                                    <div className="text-slate-400 text-sm">{phase.description}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
