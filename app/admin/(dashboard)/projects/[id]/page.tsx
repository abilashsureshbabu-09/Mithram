'use client';

export const dynamic = 'force-dynamic';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { client } from "@/lib/sanity";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Plus, Trash, Upload } from "lucide-react";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";

export default function ProjectForm() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const isNew = id === 'new';

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!isNew);

    // Form State
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [status, setStatus] = useState('ongoing');
    const [clientDetails, setClientDetails] = useState({ name: '', industry: '', location: '' });
    const [description, setDescription] = useState('');
    const [requirements, setRequirements] = useState('');
    const [roadmap, setRoadmap] = useState<{ title: string; description: string; date: string; _key?: string }[]>([]);

    // Image State
    const [mainImage, setMainImage] = useState<any>(null);
    const [gallery, setGallery] = useState<any[]>([]);

    useEffect(() => {
        if (!isNew) {
            fetchProject(id);
        }
    }, [id, isNew]);

    async function fetchProject(projectId: string) {
        try {
            const query = `*[_type == "project" && _id == $id][0]`;
            const data = await client.fetch(query, { id: projectId });
            if (data) {
                setTitle(data.title || '');
                setSlug(data.slug?.current || '');
                setStatus(data.status || 'ongoing');
                setClientDetails({
                    name: data.client?.name || '',
                    industry: data.client?.industry || '',
                    location: data.client?.location || ''
                });

                // Convert Portable Text back to string (simplification)
                const descText = data.description?.[0]?.children?.[0]?.text || '';
                setDescription(descText);

                const reqText = data.requirements?.[0]?.children?.[0]?.text || '';
                setRequirements(reqText);

                setRoadmap(data.roadmap || []);
                setMainImage(data.mainImage);
                setGallery(data.gallery || []);
            }
        } catch (e) {
            console.error("Fetch failed", e);
        } finally {
            setFetching(false);
        }
    }

    async function handleImageUpload(file: File, isGallery: boolean = false) {
        try {
            const asset = await client.assets.upload('image', file);
            const imageObject = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };

            if (isGallery) {
                setGallery([...gallery, { ...imageObject, _key: Math.random().toString(36).substring(7) }]);
            } else {
                setMainImage(imageObject);
            }
        } catch (e) {
            console.error("Upload failed", e);
            alert("Image upload failed");
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const doc = {
                _type: 'project',
                title,
                slug: { _type: 'slug', current: slug || title.toLowerCase().replace(/\s+/g, '-') },
                status,
                client: clientDetails,
                description: [{ _type: 'block', children: [{ _type: 'span', text: description }] }],
                requirements: [{ _type: 'block', children: [{ _type: 'span', text: requirements }] }],
                roadmap: roadmap.map(r => ({ ...r, _key: r._key || Math.random().toString(36).substring(7) })),
                mainImage,
                gallery: gallery.length > 0 ? gallery : undefined,
                publishedAt: isNew ? new Date().toISOString() : undefined, // Only set publishedAt on creation or keep existing
            };

            if (isNew) {
                await client.create(doc);
            } else {
                await client.patch(id).set(doc).commit();
            }

            router.push('/admin/projects');
        } catch (e) {
            console.error("Save failed", e);
            alert("Failed to save project. Check permissions.");
        } finally {
            setLoading(false);
        }
    }

    if (fetching) return <div className="p-8">Loading...</div>;

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-12">
            <div className="flex items-center gap-4">
                <Link href="/admin/projects">
                    <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
                </Link>
                <h1 className="text-3xl font-bold">{isNew ? 'New Project' : 'Edit Project'}</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <Card>
                    <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <Input
                            placeholder="Project Title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                placeholder="Slug"
                                value={slug}
                                onChange={e => setSlug(e.target.value)}
                            />
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                value={status}
                                onChange={e => setStatus(e.target.value)}
                            >
                                <option value="ongoing">Ongoing</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </CardContent>
                </Card>

                {/* Client Info */}
                <Card>
                    <CardHeader><CardTitle>Client Details</CardTitle></CardHeader>
                    <CardContent className="grid grid-cols-3 gap-4">
                        <Input
                            placeholder="Client Name"
                            value={clientDetails.name}
                            onChange={e => setClientDetails({ ...clientDetails, name: e.target.value })}
                        />
                        <Input
                            placeholder="Industry"
                            value={clientDetails.industry}
                            onChange={e => setClientDetails({ ...clientDetails, industry: e.target.value })}
                        />
                        <Input
                            placeholder="Location"
                            value={clientDetails.location}
                            onChange={e => setClientDetails({ ...clientDetails, location: e.target.value })}
                        />
                    </CardContent>
                </Card>

                {/* Details */}
                <Card>
                    <CardHeader><CardTitle>Description & Requirements</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-sm font-medium mb-1 block">Description</label>
                            <Textarea
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                rows={5}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-1 block">Requirements</label>
                            <Textarea
                                value={requirements}
                                onChange={e => setRequirements(e.target.value)}
                                rows={3}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Images */}
                <Card>
                    <CardHeader><CardTitle>Images</CardTitle></CardHeader>
                    <CardContent className="space-y-6">
                        {/* Main Image */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Main Image</label>
                            <div className="flex items-center gap-4">
                                {mainImage && (
                                    <div className="w-32 h-20 relative rounded overflow-hidden border">
                                        <img src={urlFor(mainImage).width(200).url()} alt="Main" className="w-full h-full object-cover" />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-1 right-1 h-6 w-6"
                                            onClick={() => setMainImage(null)}
                                        >
                                            <Trash className="h-3 w-3" />
                                        </Button>
                                    </div>
                                )}
                                <label className="cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 px-4 py-2 rounded-md text-sm font-medium inline-flex items-center">
                                    <Upload className="mr-2 h-4 w-4" /> Upload Main
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0], false)}
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Gallery */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Gallery</label>
                            <div className="grid grid-cols-4 gap-4 mb-4">
                                {gallery.map((img, idx) => (
                                    <div key={idx} className="relative aspect-video rounded overflow-hidden border group">
                                        <img src={urlFor(img).width(200).url()} alt="Gallery" className="w-full h-full object-cover" />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => setGallery(gallery.filter((_, i) => i !== idx))}
                                        >
                                            <Trash className="h-3 w-3" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <label className="cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 px-4 py-2 rounded-md text-sm font-medium inline-flex items-center">
                                <Plus className="mr-2 h-4 w-4" /> Add to Gallery
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0], true)}
                                />
                            </label>
                        </div>
                    </CardContent>
                </Card>

                {/* Roadmap */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Roadmap</CardTitle>
                        <Button type="button" size="sm" onClick={() => setRoadmap([...roadmap, { title: '', description: '', date: '' }])}>
                            <Plus className="mr-2 h-4 w-4" /> Add Phase
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {roadmap.map((phase, idx) => (
                            <div key={idx} className="flex gap-4 items-start border p-4 rounded-lg bg-gray-50">
                                <div className="flex-1 space-y-2">
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            placeholder="Phase Title"
                                            value={phase.title}
                                            onChange={e => {
                                                const newMap = [...roadmap];
                                                newMap[idx].title = e.target.value;
                                                setRoadmap(newMap);
                                            }}
                                        />
                                        <Input
                                            placeholder="Target Date (e.g. 2024-01)"
                                            value={phase.date}
                                            onChange={e => {
                                                const newMap = [...roadmap];
                                                newMap[idx].date = e.target.value;
                                                setRoadmap(newMap);
                                            }}
                                        />
                                    </div>
                                    <Input
                                        placeholder="Description"
                                        value={phase.description}
                                        onChange={e => {
                                            const newMap = [...roadmap];
                                            newMap[idx].description = e.target.value;
                                            setRoadmap(newMap);
                                        }}
                                    />
                                </div>
                                <Button type="button" variant="ghost" size="icon" onClick={() => setRoadmap(roadmap.filter((_, i) => i !== idx))}>
                                    <Trash className="h-4 w-4 text-red-500" />
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Button type="submit" size="lg" className="w-full bg-primary text-black hover:bg-[#e0ac1d]" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Project'}
                </Button>
            </form>
        </div>
    );
}
