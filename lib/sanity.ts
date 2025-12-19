import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

if (!projectId && process.env.NODE_ENV === 'production') {
    console.error("WARNING: NEXT_PUBLIC_SANITY_PROJECT_ID is missing in the production environment.");
}

export const client = createClient({
    projectId: projectId || "MISSING_PROJECT_ID",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    useCdn: false, // Set to false for real-time updates tailored for fresh content
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
    return builder.image(source);
}
