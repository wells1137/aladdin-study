'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import FadeIn from './animations/FadeIn';

type Video = {
    id: string;
    title: string;
    category: string;
    thumbnail: string;
    duration: string;
    platform: 'youtube' | 'bilibili';
    videoId: string;
};

const videos: Video[] = [
    {
        id: '1',
        title: '2026 马来西亚留学生活实录：吉隆坡的一天',
        category: '留学生活',
        thumbnail: '/images/daily-life.png',
        duration: '12:45',
        platform: 'youtube',
        videoId: 'ysz5S6P_z-U', // Placeholder: KL Cinematic
    },
    {
        id: '2',
        title: '马来亚大学 (UM) 沉浸式校园漫游 4K',
        category: '名校巡礼',
        thumbnail: '/images/universities.png',
        duration: '08:30',
        platform: 'youtube',
        videoId: '7RMQE_6H7c0', // Placeholder: Campus Tour
    },
    {
        id: '3',
        title: '为什么选择马来西亚留学？真实体验分享',
        category: '学长分享',
        thumbnail: '/images/kl-skyline.png',
        duration: '15:20',
        platform: 'youtube',
        videoId: 'ysz5S6P_z-U', // Placeholder
    },
];

export default function VideoGallery() {
    const [activeVideo, setActiveVideo] = useState<Video>(videos[0]);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleVideoClick = (video: Video) => {
        setActiveVideo(video);
        setIsPlaying(true);
        const player = document.getElementById('main-video-player');
        if (player && window.innerWidth < 768) {
            player.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-600/10 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <FadeIn>
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
                            沉浸式体验：留学生活实录
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            跟随镜头，探索真实的马来西亚校园环境与城市魅力，
                            <br className="hidden md:block" />
                            感受独一无二的多元文化留学体验。
                        </p>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Video Player */}
                    <div className="lg:col-span-2" id="main-video-player">
                        <FadeIn delay={0.2} className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black border border-slate-700/50 group">
                            {isPlaying ? (
                                <iframe
                                    src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1&rel=0`}
                                    title={activeVideo.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute inset-0 w-full h-full"
                                ></iframe>
                            ) : (
                                <div
                                    className="absolute inset-0 cursor-pointer group"
                                    onClick={() => setIsPlaying(true)}
                                >
                                    <Image
                                        src={activeVideo.thumbnail}
                                        alt={activeVideo.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                                    />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-lg group-hover:scale-110 transition-all duration-300">
                                            <Play className="w-8 h-8 text-white fill-white ml-1" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent">
                                        <span className="inline-block px-3 py-1 rounded-full bg-red-600 text-xs font-bold text-white mb-3">
                                            正在播放
                                        </span>
                                        <h3 className="text-xl md:text-2xl font-bold text-white line-clamp-2">
                                            {activeVideo.title}
                                        </h3>
                                    </div>
                                </div>
                            )}
                        </FadeIn>
                    </div>

                    {/* Playlist */}
                    <div className="lg:col-span-1 space-y-4">
                        <FadeIn delay={0.3}>
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-bold text-white">精彩推荐</h3>
                                <span className="text-xs text-slate-500">共 {videos.length} 个视频</span>
                            </div>
                        </FadeIn>
                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {videos.map((video, index) => (
                                <FadeIn key={video.id} delay={0.1 * index + 0.4} direction="left">
                                    <div
                                        onClick={() => handleVideoClick(video)}
                                        className={`flex gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 group border ${activeVideo.id === video.id
                                            ? 'bg-slate-800 border-red-500/50 shadow-lg shadow-red-900/20'
                                            : 'bg-slate-800/50 border-transparent hover:bg-slate-800 hover:border-slate-700'
                                            }`}
                                    >
                                        <div className="relative w-32 aspect-video rounded-lg overflow-hidden shrink-0">
                                            <Image
                                                src={video.thumbnail}
                                                alt={video.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors flex items-center justify-center">
                                                {activeVideo.id !== video.id && (
                                                    <Play className="w-6 h-6 text-white/80" />
                                                )}
                                            </div>
                                            <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 rounded text-[10px] font-mono">
                                                {video.duration}
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <span className="text-xs text-secondary font-medium mb-1">
                                                {video.category}
                                            </span>
                                            <h4 className={`text-sm font-bold line-clamp-2 leading-snug transition-colors ${activeVideo.id === video.id ? 'text-red-400' : 'text-slate-200 group-hover:text-white'
                                                }`}>
                                                {video.title}
                                            </h4>
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                        {/* Call to action in sidebar */}
                        <FadeIn delay={0.6}>
                            <div className="mt-6 p-6 rounded-xl bg-gradient-to-br from-red-600 to-red-800 text-center">
                                <p className="text-sm font-medium text-white/90 mb-3">想看更多？</p>
                                <a
                                    href="https://space.bilibili.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors shadow-lg border border-slate-700"
                                >
                                    访问我们的 Bilibili 频道
                                </a>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
}
