'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Lead = {
    id: number;
    type: string;
    name: string;
    contact: string;
    status: string;
    data: string;
    createdAt: string;
};

export default function AdminDashboard() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            router.push('/admin');
            return;
        }

        fetch('/api/leads', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.status === 401) {
                    localStorage.removeItem('adminToken');
                    router.push('/admin');
                    throw new Error('Unauthorized');
                }
                return res.json();
            })
            .then((data) => {
                setLeads(data);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, [router]);

    const toggleStatus = async (id: number, currentStatus: string) => {
        const newStatus = currentStatus === 'new' ? 'contacted' : 'new';
        const token = localStorage.getItem('adminToken');

        // Optimistic update
        setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));

        await fetch('/api/leads', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ id, status: newStatus })
        });
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">Leads Dashboard</h1>
                    <button
                        onClick={() => {
                            localStorage.removeItem('adminToken');
                            router.push('/admin');
                        }}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                        Logout
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Details</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {leads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">#{lead.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{lead.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{lead.contact}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${lead.type === 'assessment' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                                            }`}>
                                            {lead.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                        {new Date(lead.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button
                                            onClick={() => toggleStatus(lead.id, lead.status)}
                                            className={`px-2 py-1 rounded text-xs font-bold border ${lead.status === 'contacted'
                                                    ? 'bg-green-50 text-green-700 border-green-200'
                                                    : 'bg-red-50 text-red-700 border-red-200'
                                                }`}
                                        >
                                            {lead.status.toUpperCase()}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                        <button
                                            onClick={() => alert(JSON.stringify(JSON.parse(lead.data), null, 2))}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            View JSON
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {leads.length === 0 && (
                        <div className="p-8 text-center text-slate-500">No leads found.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
