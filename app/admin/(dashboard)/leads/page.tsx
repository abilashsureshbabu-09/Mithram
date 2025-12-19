'use client';

export const dynamic = 'force-dynamic';

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function AdminLeads() {
    const [leads, setLeads] = useState<any[]>([]);

    useEffect(() => {
        fetchLeads();
    }, []);

    async function fetchLeads() {
        try {
            const res = await fetch('/api/leads');
            const data = await res.json();
            setLeads(data);
        } catch (e) { }
    }

    function downloadCSV() {
        const headers = ['ID', 'Name', 'Email', 'Phone', 'Message', 'Date'];
        const rows = leads.map(l => [
            l.id,
            l.name,
            l.email,
            l.phone,
            `"${l.message.replace(/"/g, '""')}"`, // Escape quotes
            new Date(l.createdAt).toLocaleDateString()
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(r => r.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'leads.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Leads Received</h1>
                <Button onClick={downloadCSV} variant="outline">Download CSV</Button>
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
