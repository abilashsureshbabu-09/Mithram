import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID');
    process.exit(1);
}

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: 'sku2qL6Y5C4aJ4fHq3c5jK9v7Z1b2n4m5L6k7j8h9g0f1d2s3a4', // User provided token or env variable if needed.
    // NOTE: For this script to work, we need a write token. Using the one from session if available, 
    // or we will rely on user having set SANITY_API_TOKEN in .env. 
    // IF NO TOKEN, THIS WILL FAIL. 
    // Since I cannot ask for a token interactively here easily without risking exposure, 
    // I will assume the user has a token or will run `sanity login` and copy token or use `sanity exec`.
    // Actually, `sanity exec` is safer. But let's try to read SANITY_API_TOKEN.
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
    apiVersion: '2024-01-01',
});

const projects = [
    {
        title: "Downtown Revitalization",
        status: "completed",
        imageUrl: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1517581177697-a06a18f6f353?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=2070&auto=format&fit=crop"
        ],
        client: { name: "City Council", industry: "Government", location: "Metropolis" },
        roadmap: [
            { title: "Planning", description: "Initial survey and design.", date: "2022-01" },
            { title: "Execution", description: "Construction and restoration.", date: "2023-01" }
        ],
        description: "Restoration of historic buildings and modernization of downtown infrastructure."
    },
    {
        title: "Modern Art Museum",
        status: "completed",
        imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2000&auto=format&fit=crop"
        ],
        client: { name: "Art Foundation", industry: "Non-Profit", "location": "Cultural District" },
        roadmap: [
            { title: "Design", description: "Architectural competition.", date: "2021-05" },
            { title: "Build", description: "Main structure construction.", date: "2022-08" }
        ],
        description: "Architectural marvel housing contemporary art collections."
    },
    {
        title: "Solar Energy Park",
        status: "completed",
        imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1545208942-e4d3aa5cb730?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2000&auto=format&fit=crop"
        ],
        client: { name: "GreenLife Energy", industry: "Energy", "location": "SunnyVale" },
        roadmap: [
            { title: "Grid Setup", description: "Connecting to the national grid.", date: "2022-04" },
            { title: "Paneling", description: "Installation of 5000 units.", date: "2022-09" }
        ],
        description: "Large-scale solar panel installation supplying renewable energy to the grid."
    },
    {
        title: "Suburban Housing Complex",
        status: "completed",
        imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?q=80&w=1974&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600596542815-27b900faaf16?q=80&w=2070&auto=format&fit=crop"
        ],
        client: { name: "Family Homes Ltd", industry: "Real Estate", "location": "Suburbia" },
        roadmap: [
            { title: "Ground Breaking", description: "Start of construction.", date: "2022-02" },
            { title: "Sales", description: "Opening model homes.", date: "2023-06" }
        ],
        description: "Sustainable residential community with green spaces and amenities."
    },
    {
        title: "Tech Innovation Hub",
        status: "completed",
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1517502884422-41e157d258b4?q=80&w=2070&auto=format&fit=crop"
        ],
        client: { name: "TechStart Inc", industry: "Technology", "location": "Innovation Park" },
        roadmap: [
            { title: "Fitout", description: "Interior works.", date: "2023-01" },
            { title: "Launch", description: "Grand opening.", date: "2023-12" }
        ],
        description: "Co-working and incubator space for technology startups."
    },
    {
        title: "High-Speed Rail Station",
        status: "ongoing",
        imageUrl: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=2070&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1474487548417-781cb714c22d?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1532105956626-9569c03602f6?q=80&w=2070&auto=format&fit=crop"
        ],
        client: { name: "National Rail", industry: "Transportation", "location": "Central City" },
        roadmap: [
            { title: "Excavation", description: "Underground levels.", date: "2023-06" },
            { title: "Structural", description: "Main terminal hall.", date: "2024-03" }
        ],
        description: "Developing a state-of-the-art transit hub for high-speed connectivity."
    },
    {
        title: "Vertical Forest Tower",
        status: "ongoing",
        imageUrl: "https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=2067&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=2010&auto=format&fit=crop"
        ],
        client: { name: "EcoLive Developers", industry: "Real Estate", "location": "Skyline City" },
        roadmap: [
            { title: "Framework", description: "Steel structure completion.", date: "2024-01" },
            { title: "Planting", description: "Installing vertical gardens.", date: "2024-08" }
        ],
        description: "Residential skyscraper integrating trees and vegetation into the facade."
    },
    {
        title: "Ocean Cleanup Initiative",
        status: "ongoing",
        imageUrl: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?q=80&w=1974&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1618477461853-5f8dd68aa2fd?q=80&w=1964&auto=format&fit=crop"
        ],
        client: { name: "Clean Seas NGO", industry: "Environmental", "location": "Pacific" },
        roadmap: [
            { title: "Testing", description: "Prototype trials.", date: "2023-11" },
            { title: "Deployment", description: "Full scale launch.", date: "2024-05" }
        ],
        description: "Engineering project deploying systems to remove plastic from oceans."
    }
];

const posts = [
    {
        title: "The Future of Sustainable Construction",
        body: "Sustainability is no longer a buzzword; it's a necessity. In this post, we explore how green materials and energy-efficient designs are shaping the skyline of tomorrow.",
        imageUrl: "https://images.unsplash.com/photo-1518005020951-ecc8e1209529?q=80&w=2069&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1473862170180-84427c485aca?q=80&w=2000&auto=format&fit=crop"
        ]
    },
    {
        title: "Top 5 Interior Design Trends for 2024",
        body: "From biophilic design to smart home integration, discover the top trends that are redefining modern living spaces.",
        imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1617103996702-96ff29b1c467?q=80&w=2000&auto=format&fit=crop"
        ]
    },
    {
        title: "How Smart Cities are Changing Urban Living",
        body: "Smart cities leverage IoT and data to improve quality of life. Learn how connectivity is making our cities safer, cleaner, and more efficient.",
        imageUrl: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop"
        ]
    },
    {
        title: "Safety First: Best Practices on Construction Sites",
        body: "Safety is paramount in construction. We discuss essential protocols and technologies that ensure worker safety on site.",
        imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1535732759880-bbd5c7265e3f?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2000&auto=format&fit=crop"
        ]
    },
    {
        title: "Renovating vs. Rebuilding: What You Need to Know",
        body: "Deciding between renovation and rebuilding can be tough. We break down the costs, benefits, and considerations for each approach.",
        imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2031&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2000&auto=format&fit=crop"
        ]
    }
];

async function uploadImage(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch image: ${url}`);
        const buffer = await res.arrayBuffer();
        const asset = await client.assets.upload('image', Buffer.from(buffer), {
            filename: url.split('/').pop()
        });
        return asset._id;
    } catch (e) {
        console.error("Image upload failed:", e.message);
        return null; // Handle missing image gracefully
    }
}

async function seed() {
    console.log("Starting seed...");

    if (!process.env.SANITY_API_TOKEN) {
        console.error("Error: SANITY_API_TOKEN is not set in .env");
        console.error("Please add a write token to your .env file as SANITY_API_TOKEN=...");
        console.error("You can generate one at https://www.sanity.io/manage");
        process.exit(1);
    }

    for (const p of projects) {
        console.log(`Processing ${p.title}...`);

        let mainImageId = null;
        if (p.imageUrl) {
            console.log(`  Uploading main image...`);
            mainImageId = await uploadImage(p.imageUrl);
        }

        const galleryAssets = [];
        for (const imgUrl of p.gallery) {
            console.log(`  Uploading gallery image...`);
            const assetId = await uploadImage(imgUrl);
            if (assetId) galleryAssets.push({
                _type: 'image',
                asset: { _type: 'reference', _ref: assetId }
            });
        }

        const doc = {
            _type: 'project',
            title: p.title,
            slug: { _type: 'slug', current: p.title.toLowerCase().replace(/\s+/g, '-') },
            status: p.status,
            publishedAt: new Date().toISOString(),
            description: [{ _type: 'block', children: [{ _type: 'span', text: p.description }] }],
            client: p.client,
            roadmap: p.roadmap.map(r => ({ ...r, _key: Math.random().toString(36).substring(7) })),
        };

        if (mainImageId) {
            doc.mainImage = { _type: 'image', asset: { _type: 'reference', _ref: mainImageId } };
        }
        if (galleryAssets.length > 0) {
            doc.gallery = galleryAssets;
        }

        await client.createOrReplace({ ...doc, _id: `project-${doc.slug.current}` });
        console.log(`  Created/Updated project: ${p.title}`);
    }

    // Create Author
    const author = {
        _type: 'author',
        _id: 'author-admin',
        name: 'Mithram Admin',
        slug: { _type: 'slug', current: 'mithram-admin' }
    };
    await client.createOrReplace(author);
    console.log("Created Author: Mithram Admin");

    // Seed Posts
    for (const post of posts) {
        console.log(`Processing Post: ${post.title}...`);

        let mainImageId = null;
        if (post.imageUrl) {
            console.log(`  Uploading main image...`);
            mainImageId = await uploadImage(post.imageUrl);
        }

        const galleryAssets = [];
        if (post.gallery) {
            for (const imgUrl of post.gallery) {
                console.log(`  Uploading gallery image...`);
                const assetId = await uploadImage(imgUrl);
                if (assetId) galleryAssets.push({
                    _type: 'image',
                    asset: { _type: 'reference', _ref: assetId }
                });
            }
        }

        const doc = {
            _type: 'post',
            title: post.title,
            slug: { _type: 'slug', current: post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') },
            publishedAt: new Date().toISOString(),
            body: [{ _type: 'block', children: [{ _type: 'span', text: post.body }] }],
            author: { _type: 'reference', _ref: 'author-admin' }
        };

        if (mainImageId) {
            doc.mainImage = { _type: 'image', asset: { _type: 'reference', _ref: mainImageId } };
        }

        if (galleryAssets.length > 0) {
            doc.gallery = galleryAssets;
        }

        await client.createOrReplace({ ...doc, _id: `post-${doc.slug.current}` });
        console.log(`  Created/Updated post: ${post.title}`);
    }

    console.log("Seeding complete!");
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
