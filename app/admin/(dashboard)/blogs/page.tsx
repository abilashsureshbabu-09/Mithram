'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { client } from "@/lib/sanity";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AdminBlogs() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlogs();
    }, []);

    async function fetchBlogs() {
        try {
            const query = `*[_type == "post"] | order(publishedAt desc) {
                _id,
                title,
                publishedAt,
                author->{name}
            }`;
            const data = await client.fetch(query);
            setBlogs(data);
        } catch (e) {
            console.error("Failed to fetch blogs", e);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this post?")) return;
        try {
            await client.delete(id);
            alert("Post deleted");
            fetchBlogs();
        } catch (e) {
            console.error("Delete failed", e);
            alert("Failed to delete. Check permissions.");
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Manage Blogs</h1>
                <Link href="/admin/blogs/new">
                    <Button className="bg-primary text-black hover:bg-[#e0ac1d]">
                        <Plus className="mr-2 h-4 w-4" /> Write New Post
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4">
                {loading ? (
                    <p>Loading posts...</p>
                ) : blogs.length === 0 ? (
                    <Card>
                        <CardContent className="p-8 text-center text-gray-500">
                            No blog posts found. Write your first one!
                        </CardContent>
                    </Card>
                ) : (
                    blogs.map((b) => (
                        <Card key={b._id}>
                            <CardContent className="p-4 flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-lg">{b.title}</h3>
                                    <div className="flex gap-2 text-sm text-muted-foreground">
                                        <span>{new Date(b.publishedAt).toLocaleDateString()}</span>
                                        {b.author?.name && <span>• by {b.author.name}</span>}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Link href={`/admin/blogs/${b._id}`}>
                                        <Button variant="outline" size="sm">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(b._id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
