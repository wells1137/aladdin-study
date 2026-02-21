'use client';

import { useState } from 'react';
import { Search, Globe, ChevronRight, CheckCircle2, Circle, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Milestone {
    id: number;
    label: string;
    description: string;
    completed: boolean;
    date: string | null;
}

interface EMGSData {
    studentName: string;
    passportNumber: string;
    nationality: string;
    applicationNumber: string;
    institution: string;
    course: string;
    progress: number;
    status: string;
    milestones: Milestone[];
}

export default function EMGSTrackerPage() {
    const [passport, setPassport] = useState('');
    const [nationality, setNationality] = useState('CHINA');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [data, setData] = useState<EMGSData | null>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setData(null);

        try {
            const res = await fetch('/api/emgs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ passport, nationality }),
            });
            const result = await res.json();

            if (res.ok) {
                setData(result.data);
            } else {
                setError(result.error || 'Failed to fetch status');
            }
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-950 flex flex-col">
            <Navbar />

            {/* Hero Header */}
            <div className="pt-32 pb-16 px-4 relative overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 bg-brand-primary/5 -skew-y-3 transform origin-top-left -z-10 w-full h-full border-b border-white/5"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-primary/20 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-sm font-medium mb-6 animate-fade-in-up">
                        <Globe className="w-4 h-4" />
                        Official EMGS Data Synchronization
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        Track Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-400">Student Visa</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        Enter your passport details below to instantly check your EMGS (Education Malaysia Global Services) application progress in real-time.
                    </p>
                </div>
            </div>

            {/* Search Form */}
            <div className="max-w-3xl mx-auto w-full px-4 -mt-8 relative z-10 flex-shrink-0 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <form onSubmit={handleSearch} className="bg-slate-900 border border-white/10 p-2 pl-6 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-4">
                    <div className="flex-1 w-full">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Passport Number</label>
                        <input
                            type="text"
                            value={passport}
                            onChange={(e) => setPassport(e.target.value.toUpperCase())}
                            placeholder="e.g. E1234567"
                            required
                            className="w-full bg-transparent border-none text-white font-medium focus:ring-0 p-0 placeholder:text-slate-600"
                        />
                    </div>

                    <div className="w-full md:w-px h-px md:h-12 bg-white/10 shrink-0 mx-2"></div>

                    <div className="flex-1 w-full">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Nationality</label>
                        <select
                            value={nationality}
                            onChange={(e) => setNationality(e.target.value)}
                            className="w-full bg-transparent border-none text-white font-medium focus:ring-0 p-0 cursor-pointer appearance-none"
                        >
                            <option value="CHINA">CHINA</option>
                            <option value="INDONESIA">INDONESIA</option>
                            <option value="INDIA">INDIA</option>
                            <option value="BANGLADESH">BANGLADESH</option>
                            <option value="PAKISTAN">PAKISTAN</option>
                            <option value="NIGERIA">NIGERIA</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full md:w-auto bg-brand-primary hover:bg-brand-primary/90 text-white font-bold h-14 px-8 rounded-xl transition-all shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2 group disabled:opacity-50"
                    >
                        {loading ? 'Searching...' : (
                            <>
                                Track Now <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                {error && (
                    <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-center text-sm font-medium animate-fade-in-up">
                        {error}
                    </div>
                )}
            </div>

            {/* Results Section */}
            <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-16 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                {data ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* Left Column: Progress Circular & Profile Overview */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden text-center shadow-xl">
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent pointer-events-none"></div>

                                {/* CSS Circular Progress */}
                                <div className="relative w-48 h-48 mb-6 flex items-center justify-center group">
                                    <svg className="w-full h-full -rotate-90 transform pointer-events-none">
                                        <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-800" />
                                        <circle
                                            cx="96" cy="96" r="88"
                                            stroke="url(#gradient)"
                                            strokeWidth="12"
                                            fill="transparent"
                                            strokeDasharray="552.9"
                                            strokeDashoffset={552.9 - (552.9 * data.progress) / 100}
                                            strokeLinecap="round"
                                            className="transition-all duration-1000 ease-out"
                                        />
                                        <defs>
                                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#4F46E5" />
                                                <stop offset="100%" stopColor="#10B981" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-5xl font-black text-white tracking-tighter group-hover:scale-110 transition-transform">{data.progress}<span className="text-2xl text-slate-400">%</span></span>
                                    </div>
                                </div>

                                <div className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-sm tracking-wide mb-2">
                                    {data.status.toUpperCase()}
                                </div>
                                <p className="text-sm text-slate-400">Current Application Phase</p>
                            </div>

                            {/* Profile Details Card */}
                            <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">Applicant Name</p>
                                    <p className="text-white font-medium">{data.studentName}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">Institution</p>
                                    <p className="text-white font-medium line-clamp-1">{data.institution}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">Course</p>
                                    <p className="text-white font-medium line-clamp-2 leading-snug text-sm">{data.course}</p>
                                </div>
                                <div className="pt-4 border-t border-white/5 flex justify-between items-center text-sm">
                                    <span className="text-slate-500">App No:</span>
                                    <code className="text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded">{data.applicationNumber}</code>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Timeline */}
                        <div className="lg:col-span-7 bg-slate-900 border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
                            <h3 className="text-xl font-bold text-white mb-8 border-b border-white/5 pb-4">Application Milestone Tracker</h3>

                            <div className="space-y-0 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
                                {data.milestones.map((milestone, index) => (
                                    <div key={milestone.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active py-4">

                                        {/* Icon */}
                                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10 transition-colors duration-300
                                            ${milestone.completed
                                                ? 'bg-brand-primary border-slate-900 text-white'
                                                : index === data.milestones.findIndex(m => !m.completed) // Active step
                                                    ? 'bg-slate-800 border-brand-primary text-brand-primary animate-pulse'
                                                    : 'bg-slate-800 border-slate-900 text-slate-500'}`}
                                        >
                                            {milestone.completed ? <CheckCircle2 className="w-5 h-5" /> : index === data.milestones.findIndex(m => !m.completed) ? <Clock className="w-4 h-4" /> : <Circle className="w-3 h-3" />}
                                        </div>

                                        {/* Content Card */}
                                        <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-2xl border transition-all duration-300
                                            ${milestone.completed
                                                ? 'bg-white/5 border-white/10 hover:bg-white/10'
                                                : index === data.milestones.findIndex(m => !m.completed)
                                                    ? 'bg-brand-primary/5 border-brand-primary/30 ring-1 ring-brand-primary/20'
                                                    : 'bg-transparent border-transparent opacity-50'}`}
                                        >
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-1">
                                                <h4 className={`font-bold text-base ${milestone.completed ? 'text-white' : index === data.milestones.findIndex(m => !m.completed) ? 'text-brand-primary' : 'text-slate-400'}`}>
                                                    {milestone.label}
                                                </h4>
                                                {milestone.date && (
                                                    <span className="text-xs font-mono text-slate-500 bg-slate-800/50 px-2 py-0.5 rounded-full inline-block w-fit">
                                                        {milestone.date}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-slate-400 leading-relaxed">
                                                {milestone.description}
                                            </p>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                ) : (
                    <div className="h-48 md:h-64 flex flex-col items-center justify-center text-slate-500">
                        <Globe className="w-12 h-12 mb-4 opacity-20" />
                        <p>Waiting for query. Enter your passport to track EMGS progress.</p>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
