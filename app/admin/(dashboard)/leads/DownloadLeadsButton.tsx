'use client';

import { Button } from "@/components/ui/button";

export function DownloadLeadsButton({ leads }: { leads: any[] }) {
    function downloadCSV() {
        const headers = ['ID', 'Name', 'Email', 'Phone', 'Message', 'Date'];
        const rows = leads.map(l => [
            l.id,
            l.name,
            l.email,
            l.phone,
            `"${(l.message || "").replace(/"/g, '""')}"`, // Escape quotes
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
        <Button onClick={downloadCSV} variant="outline">Download CSV</Button>
    );
}
