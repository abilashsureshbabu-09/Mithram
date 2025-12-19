
import { client } from "@/lib/sanity";
import ProjectDetails from "@/components/project/ProjectDetails";

export async function generateStaticParams() {
    try {
        const projects = await client.fetch(`*[_type == "project"]{ "slug": slug.current }`);
        return projects.map((project: any) => ({
            slug: project.slug,
        }));
    } catch (e) {
        console.error("Error generating params", e);
        return [];
    }
}

export default async function ProjectPage({ params }: { params: any }) {
    const { slug } = await params;

    let project = null;
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
        project = await client.fetch(query, { slug });
    } catch (error) {
        console.error("Error fetching project:", error);
    }

    return <ProjectDetails project={project} />;
}
