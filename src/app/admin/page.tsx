'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password) {
            // In a real app, we'd verify with an API endpoint returning a token.
            // Here for MVP simplicity, we use the password as the token directly.
            localStorage.setItem('adminToken', password);
            router.push('/admin/dashboard');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-6 text-center text-slate-800">Admin Login</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Admin Password"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="w-full bg-slate-900 text-white py-2 rounded-lg hover:bg-slate-800 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
