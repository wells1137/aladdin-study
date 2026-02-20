'use client';
import { useState } from 'react';

export default function SpringBanner() {
    const [dismissed, setDismissed] = useState(false);

    if (dismissed) return null;

    return (
        <div className="relative z-[1] spring-banner-gradient text-white text-center overflow-hidden">
            {/* Animated lanterns on sides */}
            <div className="absolute left-4 top-0 text-2xl sm:text-3xl animate-lantern-swing origin-top">🏮</div>
            <div className="absolute right-4 top-0 text-2xl sm:text-3xl animate-lantern-swing origin-top" style={{ animationDelay: '0.5s' }}>🏮</div>
            <div className="absolute left-16 top-0 text-lg sm:text-xl animate-lantern-swing origin-top" style={{ animationDelay: '0.3s' }}>🏮</div>
            <div className="absolute right-16 top-0 text-lg sm:text-xl animate-lantern-swing origin-top" style={{ animationDelay: '0.8s' }}>🏮</div>

            <div className="relative py-3 px-12 flex items-center justify-center gap-3 flex-wrap">
                <span className="text-lg sm:text-xl">🐴</span>
                <span className="text-sm sm:text-base font-bold tracking-wider spring-text-glow">
                    🎆 恭贺新春 · 马年大吉 · 万事如意 🎆
                </span>
                <span className="text-lg sm:text-xl">🐴</span>
            </div>

            {/* Dismiss button */}
            <button
                onClick={() => setDismissed(true)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-xl leading-none transition-colors px-2"
                aria-label="关闭春节横幅"
            >
                ×
            </button>

            {/* Sparkle line at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] spring-sparkle-line" />
        </div>
    );
}
