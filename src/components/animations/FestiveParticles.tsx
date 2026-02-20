'use client';
import { useEffect, useState } from 'react';

interface Particle {
    id: number;
    emoji: string;
    x: number;
    size: number;
    duration: number;
    delay: number;
    swayAmount: number;
}

export default function FestiveParticles() {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const emojis = ['🏮', '🧧', '🎆', '✨', '🐴', '福', '🎊'];
        const generated: Particle[] = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            emoji: emojis[Math.floor(Math.random() * emojis.length)],
            x: Math.random() * 100,
            size: 16 + Math.random() * 20,
            duration: 8 + Math.random() * 12,
            delay: Math.random() * 10,
            swayAmount: 30 + Math.random() * 60,
        }));
        setParticles(generated);
    }, []);

    if (particles.length === 0) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden" aria-hidden="true">
            {particles.map((p) => (
                <span
                    key={p.id}
                    className="absolute animate-festive-fall"
                    style={{
                        left: `${p.x}%`,
                        fontSize: `${p.size}px`,
                        animationDuration: `${p.duration}s`,
                        animationDelay: `${p.delay}s`,
                        '--sway': `${p.swayAmount}px`,
                    } as React.CSSProperties}
                >
                    {p.emoji}
                </span>
            ))}
        </div>
    );
}
