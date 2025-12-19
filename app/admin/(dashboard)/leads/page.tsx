import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { DownloadLeadsButton } from "./DownloadLeadsButton";

export const dynamic = 'force-dynamic';

export default async function AdminLeads() {
    let leads: any[] = [];
    try {
        leads = await prisma.lead.findMany({
            orderBy: { createdAt: 'desc' }
        });
    } catch (e) {
        console.error("Failed to fetch leads:", e);
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Leads Received</h1>
                <DownloadLeadsButton leads={leads} />
            </div>

            <div className="rounded-md border bg-card">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b bg-muted/50 transition-colors">
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Contact</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.map((lead) => (
                            <tr key={lead.id} className="border-b transition-colors hover:bg-muted/50">
                                <td className="p-4 align-middle">{new Date(lead.createdAt).toLocaleDateString()}</td>
                                <td className="p-4 align-middle font-medium">{lead.name}</td>
                                <td className="p-4 align-middle">
                                    <div>{lead.email}</div>
                                    <div className="text-xs text-muted-foreground">{lead.phone}</div>
                                </td>
                                <td className="p-4 align-middle max-w-md truncate">{lead.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
