'use client';
import { useRef, useState, useCallback } from 'react';

interface GlowCardProps {
    children: React.ReactNode;
    className?: string;
    glowColor?: string;
    borderRadius?: string;
}

export default function GlowCard({
    children,
    className = '',
    glowColor = 'rgba(196, 30, 58, 0.4)',
    borderRadius = '0px',
}: GlowCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setGlowPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    }, []);

    return (
        <div
            ref={cardRef}
            className={`relative group ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{ borderRadius }}
        >
            {/* Glow effect overlay */}
            <div
                className="absolute -inset-px pointer-events-none transition-opacity duration-500"
                style={{
                    borderRadius,
                    opacity: isHovering ? 1 : 0,
                    background: `radial-gradient(600px circle at ${glowPosition.x}px ${glowPosition.y}px, ${glowColor}, transparent 40%)`,
                }}
            />
            {/* Inner content */}
            <div className="relative" style={{ borderRadius }}>
                {children}
            </div>
        </div>
    );
}
