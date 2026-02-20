import React from 'react';
import SocialMap from '@/components/SocialMap';

export const metadata = {
    title: 'Community Map - Aladdin Study',
    description: 'Connect with other students around Malaysia. Share your location and discover study buddies.',
};

export default function CommunityMapPage() {
    return (
        <section className="w-full absolute inset-0 -mt-20">
            <SocialMap />
        </section>
    );
}
