'use client';

export const dynamic = 'force-dynamic';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { client, urlFor } from "@/lib/sanity";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Upload, Trash, Plus } from "lucide-react";
import Link from "next/link";

export default function BlogForm() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const isNew = id === 'new';

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!isNew);

    // Form State
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [body, setBody] = useState('');
    const [mainImage, setMainImage] = useState<any>(null);
    const [gallery, setGallery] = useState<any[]>([]);

    useEffect(() => {
        if (!isNew) {
            fetchBlog(id);
        }
    }, [id, isNew]);

    async function fetchBlog(blogId: string) {
        try {
            const query = `*[_type == "post" && _id == $id][0]`;
            const data = await client.fetch(query, { id: blogId });
            if (data) {
                setTitle(data.title || '');
                setSlug(data.slug?.current || '');
                // Simple block text extraction
                const bodyText = data.body?.[0]?.children?.[0]?.text || '';
                setBody(bodyText);
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
                _type: 'post',
                title,
                slug: { _type: 'slug', current: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') },
                body: [{ _type: 'block', children: [{ _type: 'span', text: body }] }],
                mainImage,
                gallery: gallery.length > 0 ? gallery : undefined,
                author: { _type: 'reference', _ref: 'author-admin' }, // Ensure author exists from seeding
                publishedAt: isNew ? new Date().toISOString() : undefined,
            };

            if (isNew) {
                await client.create(doc);
            } else {
                await client.patch(id).set(doc).commit();
            }

            router.push('/admin/blogs');
        } catch (e) {
            console.error("Save failed", e);
            alert("Failed to save post.");
        } finally {
            setLoading(false);
        }
    }

    if (fetching) return <div className="p-8">Loading...</div>;

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-12">
            <div className="flex items-center gap-4">
                <Link href="/admin/blogs">
                    <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
                </Link>
                <h1 className="text-3xl font-bold">{isNew ? 'New Blog Post' : 'Edit Blog Post'}</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <Card>
                    <CardHeader><CardTitle>Post Content</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <Input
                            placeholder="Post Title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                        />
                        <Input
                            placeholder="Slug"
                            value={slug}
                            onChange={e => setSlug(e.target.value)}
                        />
                        <Textarea
                            placeholder="Write your article..."
                            value={body}
                            onChange={e => setBody(e.target.value)}
                            rows={15}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Images</CardTitle></CardHeader>
                    <CardContent className="space-y-6">
                        {/* Main Image */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Cover Image</label>
                            <div className="flex items-center gap-4">
                                {mainImage && (
                                    <div className="w-32 h-20 relative rounded overflow-hidden border">
                                        <img src={urlFor(mainImage).width(200).url()} alt="Cover" className="w-full h-full object-cover" />
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
                                    <Upload className="mr-2 h-4 w-4" /> Upload Cover
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

                <Button type="submit" size="lg" className="w-full bg-primary text-black hover:bg-[#e0ac1d]" disabled={loading}>
                    {loading ? 'Saving...' : 'Publish Post'}
                </Button>
            </form>
        </div>
    );
}
