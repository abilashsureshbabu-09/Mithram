const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const projects = [
        {
            title: "Green Valley Villas",
            category: "Residential",
            description: "A luxury gated community with 50+ eco-friendly villas featuring solar power and rain water harvesting.",
            location: "Medavakkam, Chennai",
            imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
        },
        {
            title: "Tech Park Phase 1",
            category: "Commercial",
            description: "State-of-the-art office complex with 20 floors, designed for top IT firms.",
            location: "OMR, Chennai",
            imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
        },
        {
            title: "Mithram Industrial Hub",
            category: "Industrial",
            description: "Heavy machinery manufacturing plant with reinforced flooring and high ceilings.",
            location: "Oragadam, Chennai",
            imageUrl: "https://images.unsplash.com/photo-1581094794329-cd56b507dca0?q=80&w=800&auto=format&fit=crop"
        },
        {
            title: "City Center Mall",
            category: "Commercial",
            description: "Modern shopping complex with multiplex, food court, and underground parking.",
            location: "Velachery, Chennai",
            imageUrl: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=800&auto=format&fit=crop"
        },
        {
            title: "Blue Horizon Apartments",
            category: "Residential",
            description: "Affordable housing project with 200 units, park, and community hall.",
            location: "Tambaram, Chennai",
            imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop"
        }
    ];

    for (const project of projects) {
        await prisma.project.create({
            data: project
        });
    }
    console.log('Seeded 5 projects');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
