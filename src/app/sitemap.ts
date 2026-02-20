import { MetadataRoute } from 'next';
import { guides } from '@/lib/guidesData';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://aladdineducation.com';

    const guideEntries: MetadataRoute.Sitemap = guides.map((guide) => ({
        url: `${baseUrl}/guides/${guide.slug}`,
        lastModified: new Date(guide.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: {
            languages: {
                'zh-CN': `${baseUrl}/guides/${guide.slug}`,
            },
        },
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
            alternates: {
                languages: {
                    'zh-CN': baseUrl,
                },
            },
        },
        {
            url: `${baseUrl}/guides`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
            alternates: {
                languages: {
                    'zh-CN': `${baseUrl}/guides`,
                },
            },
        },
        ...guideEntries,
    ];
}
