import { ReactNode } from 'react';

interface MarqueeProps {
    children: ReactNode;
    className?: string;
    reverse?: boolean;
}

const Marquee = ({ children, className = "", reverse = false }: MarqueeProps) => {
    return (
        <div className={`overflow-hidden whitespace-nowrap flex ${className}`}>
            <div className={`flex animate-marquee ${reverse ? 'flex-row-reverse' : ''}`}>
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex px-4">
                        {children}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Marquee;
