'use client';
import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';

interface AnimatedCounterProps {
    target: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    className?: string;
}

export default function AnimatedCounter({
    target,
    suffix = '',
    prefix = '',
    duration = 2,
    className = '',
}: AnimatedCounterProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => {
        if (target >= 100) return Math.round(latest);
        return Math.round(latest);
    });
    const display = useTransform(rounded, (latest) => `${prefix}${latest}${suffix}`);

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, target, {
                duration,
                ease: [0.25, 0.46, 0.45, 0.94],
            });
            return () => controls.stop();
        }
    }, [isInView, target, duration, count]);

    return (
        <motion.span ref={ref} className={className}>
            {display}
        </motion.span>
    );
}
