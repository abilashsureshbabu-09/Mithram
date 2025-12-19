import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { client } from "@/lib/sanity";

// Dynamic because we fetch fresh data
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    let projectCount = 0;

    // We can keep leads as Prisma if they are stored locally, 
    // or switch them to Sanity too. For now, let's assume Leads are still local 
    // or set to 0 if Prisma is removed.
    // However, since we are moving to Sanity, let's fetch projects from Sanity.

    try {
        projectCount = await client.fetch(`count(*[_type == "project"])`);
    } catch (e) {
        console.error("Error fetching project count:", e);
    }

    // Placeholder for leads if Prisma is not being used
    let leadCount = 0;
    // If you still have Prisma for leads, you can uncomment this:
    // try { leadCount = await prisma.lead.count(); } catch(e) {}

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{projectCount}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Leads</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{leadCount}</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
