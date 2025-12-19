
import { client, urlFor } from "@/lib/sanity";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PortableText } from "@portabletext/react";
import { Calendar, User } from "lucide-react";

export async function generateStaticParams() {
    try {
        const posts = await client.fetch(`*[_type == "post"]{ "slug": slug.current }`);
        return posts.map((post: any) => ({
            slug: post.slug,
        }));
    } catch (e) {
        console.error("Error generating blog params", e);
        return [];
    }
}

export default async function BlogPostPage({ params }: { params: any }) {
    const { slug } = await params;

    let post = null;
    try {
        post = await client.fetch(`*[_type == "post" && slug.current == $slug][0] {
            title,
            mainImage,
            publishedAt,
            "author": author->{name},
            body
        }`, { slug });
    } catch (e) {
        console.error("Error fetching post", e);
    }

    if (!post) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <h1 className="text-2xl font-bold">Post not found</h1>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-white">
                {/* Hero Section with Title */}
                <div className="bg-zinc-900 text-white py-24 min-h-[40vh] flex items-center relative overflow-hidden">
                    {post.mainImage && (
                        <div className="absolute inset-0 opacity-30">
                            <img
                                src={urlFor(post.mainImage).url()}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>

                    <div className="container mx-auto px-4 relative z-10 grid gap-6">
                        <div className="flex gap-4 text-sm text-primary uppercase tracking-wider font-bold">
                            <span className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                {new Date(post.publishedAt || new Date()).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                {post.author?.name || 'Admin'}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-heading font-bold uppercase max-w-4xl leading-tight">
                            {post.title}
                        </h1>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-16">
                    <article className="max-w-3xl mx-auto">
                        <div className="prose prose-lg prose-headings:font-heading prose-headings:uppercase prose-a:text-primary hover:prose-a:text-black">
                            <PortableText value={post.body} />
                        </div>
                    </article>
                </div>
            </main>
            <Footer />
        </>
    );
}
