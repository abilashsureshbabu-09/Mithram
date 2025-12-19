import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { client, urlFor } from "@/lib/sanity";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";

// export const dynamic = 'force-dynamic';

interface Post {
    _id: string;
    title: string;
    slug: { current: string };
    mainImage: any;
    publishedAt: string;
    author: { name: string };
    body: any;
}

async function getPosts() {
    try {
        const query = `*[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        mainImage,
        publishedAt,
        "author": author->{name},
        body
      }`;
        return await client.fetch(query);
    } catch (error) {
        console.error("Error fetching blogs (Build Safe):", error);
        return [];
    }
}

export default async function BlogsPage() {
    const posts: Post[] = await getPosts();

    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                <div className="bg-zinc-900 text-white py-32 relative">
                    <div className="container mx-auto px-4 relative z-10">
                        <h1 className="text-5xl font-heading font-bold uppercase border-l-8 border-[#FDC221] pl-6">News & Insights</h1>
                    </div>
                </div>

                <section className="py-24 container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.length === 0 ? <p className="col-span-full text-center text-gray-500">No blog posts found. Check your Sanity Studio!</p> : posts.map((post) => (
                            <div key={post._id} className="bg-white border border-gray-100 hover:shadow-xl transition-all group">
                                <div className="h-64 bg-gray-200 overflow-hidden">
                                    {post.mainImage ? (
                                        <img
                                            src={urlFor(post.mainImage).width(800).url()}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">No Image</div>
                                    )}
                                </div>
                                <div className="p-8">
                                    <div className="flex gap-4 text-xs text-gray-400 mb-4 uppercase tracking-wider font-bold">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3 text-primary" />
                                            {new Date(post.publishedAt || "2024-01-01").toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <User className="h-3 w-3 text-primary" />
                                            {post.author?.name || 'Admin'}
                                        </span>
                                    </div>
                                    <h2 className="text-xl font-heading font-bold uppercase mb-4 hover:text-primary transition-colors cursor-pointer">{post.title}</h2>
                                    <p className="text-gray-500 line-clamp-3 mb-6 text-sm">
                                        {/* Simple text extraction from block content or fallback */}
                                        Click to read full article
                                    </p>
                                    <Link href={`/blogs/${post.slug?.current}`} className="inline-flex items-center text-xs font-bold uppercase bg-black text-white px-5 py-3 hover:bg-[#FDC221] hover:text-black transition-colors">
                                        Read More <ArrowRight className="ml-2 h-3 w-3" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

