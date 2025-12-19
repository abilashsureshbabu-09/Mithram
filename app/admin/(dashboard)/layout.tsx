'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FolderKanban, FileText, Users, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/logout', { method: 'POST' });
        router.push('/admin/login');
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-[#1A1A1A] text-white hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-800">
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="Mithram" className="h-10 w-auto object-contain" />
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin/dashboard">
                        <Button variant="ghost" className="w-full justify-start text-white hover:text-primary hover:bg-white/5">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Dashboard
                        </Button>
                    </Link>
                    <Link href="/admin/projects">
                        <Button variant="ghost" className="w-full justify-start text-white hover:text-primary hover:bg-white/5">
                            <FolderKanban className="mr-2 h-4 w-4" />
                            Projects
                        </Button>
                    </Link>
                    <Link href="/admin/blogs">
                        <Button variant="ghost" className="w-full justify-start text-white hover:text-primary hover:bg-white/5">
                            <FileText className="mr-2 h-4 w-4" />
                            Blogs
                        </Button>
                    </Link>
                    <Link href="/admin/leads">
                        <Button variant="ghost" className="w-full justify-start text-white hover:text-primary hover:bg-white/5">
                            <Users className="mr-2 h-4 w-4" />
                            Leads
                        </Button>
                    </Link>
                    <Link href="/studio" target="_blank">
                        <Button variant="ghost" className="w-full justify-start text-white hover:text-primary hover:bg-white/5">
                            <FileText className="mr-2 h-4 w-4" />
                            CMS Studio
                        </Button>
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
