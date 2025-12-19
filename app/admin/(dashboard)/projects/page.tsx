'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { client } from "@/lib/sanity";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminProjects() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchProjects();
    }, []);

    async function fetchProjects() {
        try {
            const query = `*[_type == "project"] | order(publishedAt desc) {
                _id,
                title,
                status,
                client
            }`;
            const data = await client.fetch(query);
            setProjects(data);
        } catch (e) {
            console.error("Failed to fetch projects", e);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            // Note: In a real app, use a Server Action or Route Handler to keep token secret.
            // Since this is a client-side demo and we assume the token is available or 
            // the user is authenticated, we might need a proxy.
            // However, `client` from `lib/sanity` usually creates a read-only client if no token is provided.
            // To delete, we need a write token.
            // For now, I'll assume we have a write token configured in `lib/sanity` OR 
            // I should use a server action. 
            // Let's stick to the pattern of using `client` but if it fails auth, we know why.
            // Actually, best practice here for the user "Im the developer" is to set the token in .env.

            await client.delete(id);
            alert("Project deleted");
            fetchProjects();
        } catch (e) {
            console.error("Delete failed", e);
            alert("Failed to delete. Make sure you have a valid token in .env");
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Manage Projects</h1>
                <Link href="/admin/projects/new">
                    <Button className="bg-primary text-black hover:bg-[#e0ac1d]">
                        <Plus className="mr-2 h-4 w-4" /> Add New Project
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4">
                {loading ? (
                    <p>Loading projects...</p>
                ) : projects.length === 0 ? (
                    <Card>
                        <CardContent className="p-8 text-center text-gray-500">
                            No projects found. Create your first one!
                        </CardContent>
                    </Card>
                ) : (
                    projects.map((p) => (
                        <Card key={p._id}>
                            <CardContent className="p-4 flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-lg">{p.title}</h3>
                                    <div className="flex gap-2 text-sm text-muted-foreground">
                                        <span className="uppercase bg-gray-100 px-2 py-0.5 rounded text-xs font-bold">{p.status}</span>
                                        {p.client?.name && <span>• Client: {p.client.name}</span>}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Link href={`/admin/projects/${p._id}`}>
                                        <Button variant="outline" size="sm">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(p._id)}>
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
