'use client';

import { useState } from 'react';
import { X, MapPin, CheckCircle2, GraduationCap, Home } from 'lucide-react';

interface StudentPinModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentLocation: { longitude: number; latitude: number } | null;
    onSuccess: () => void;
}

export default function StudentPinModal({ isOpen, onClose, currentLocation, onSuccess }: StudentPinModalProps) {
    const [title, setTitle] = useState(''); // E.g., Apartment Name
    const [description, setDescription] = useState(''); // E.g., University / Course
    const [imageUrl, setImageUrl] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!currentLocation) {
            setError('无法获取当前地图坐标，请移动地图后再试');
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem('auth_token');
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    type: 'student', // Force type to student
                    title,
                    description,
                    longitude: currentLocation.longitude,
                    latitude: currentLocation.latitude
                }),
            });

            const data = await res.json();

            if (res.ok) {
                // Reset form
                setTitle('');
                setDescription('');
                onSuccess(); // Triggers a map refresh and closes modal
            } else {
                setError(data.error || '发布失败');
            }
        } catch {
            setError('网络错误，请重试');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={onClose} />

            {/* Modal */}
            <div className="relative w-full max-w-md mx-4 bg-slate-900 border border-white/20 shadow-2xl rounded-2xl overflow-hidden animate-fade-in-up">

                {/* Header */}
                <div className="relative h-24 bg-gradient-to-br from-brand-primary to-orange-500 p-6 flex flex-col justify-end">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                        <MapPin className="w-6 h-6" /> Share a Moment
                    </h2>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">

                    <div>
                        <div className="bg-brand-primary/10 border border-brand-primary/20 rounded-xl p-4 text-sm text-brand-primary mb-2 flex items-start gap-3">
                            <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                            <p>
                                您即将在地图上留下您的专属印记。请填写您的基本信息，让更多阿拉仃校友认识您！
                            </p>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Home className="h-5 w-5 text-slate-500" />
                            </div>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-slate-800 border border-white/10 text-white pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all placeholder:text-slate-500"
                                placeholder="所住公寓名称 (例如: South View)"
                                required
                                maxLength={50}
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <GraduationCap className="h-5 w-5 text-slate-500" />
                            </div>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full bg-slate-800 border border-white/10 text-white pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all placeholder:text-slate-500"
                                placeholder="就读院校及专业 (例如: UM, Computer Science)"
                                required
                                maxLength={100}
                            />
                        </div>
                    </div>

                    {/* Coordinate Indicator */}
                    <div className="flex items-center gap-2 text-xs text-brand-primary bg-brand-primary/10 p-3 rounded-lg border border-brand-primary/20">
                        <MapPin className="w-4 h-4 shrink-0" />
                        <span>
                            {currentLocation
                                ? `将发布在当前地图准星位置: [${currentLocation.longitude.toFixed(4)}, ${currentLocation.latitude.toFixed(4)}]`
                                : '正在获取定位...'}
                        </span>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !currentLocation}
                        className="w-full flex items-center justify-center gap-2 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-all border border-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <CheckCircle2 className="w-5 h-5" />
                        {loading ? '发布中...' : '扎根阿拉仃 Pin Profile'}
                    </button>
                </form>
            </div>
        </div>
    );
}
