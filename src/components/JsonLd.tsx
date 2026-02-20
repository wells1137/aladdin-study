interface JsonLdProps {
    data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

export function OrganizationJsonLd() {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: '阿拉仃教育 (Aladdin Education)',
        url: 'https://aladdineducation.com',
        logo: 'https://aladdineducation.com/logo.png',
        description: '阿拉仃教育是您最值得信赖的马来西亚留学伙伴。提供从选校咨询、申请办理、签证辅导到境外接机、住宿安排的全方位一站式服务。',
        foundingDate: '2020',
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '18153480528',
            contactType: 'customer service',
            email: 'Aladddin.edu@outlook.com',
            availableLanguage: ['Chinese', 'English', 'Malay'],
        },
        address: [
            {
                '@type': 'PostalAddress',
                addressLocality: 'Kuala Lumpur',
                addressCountry: 'MY',
                description: '马来西亚总部',
            },
            {
                '@type': 'PostalAddress',
                addressLocality: 'Hefei',
                addressRegion: 'Anhui',
                addressCountry: 'CN',
                description: '中国总部',
            },
            {
                '@type': 'PostalAddress',
                addressLocality: 'Jinan',
                addressRegion: 'Shandong',
                addressCountry: 'CN',
                description: '济南合作办公室',
            },
            {
                '@type': 'PostalAddress',
                addressLocality: 'Nanchang',
                addressRegion: 'Jiangxi',
                addressCountry: 'CN',
                description: '南昌合作办公室',
            },
        ],
        sameAs: [],
        areaServed: {
            '@type': 'Country',
            name: 'Malaysia',
        },
    };

    return <JsonLd data={data} />;
}

export function WebSiteJsonLd() {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: '阿拉仃教育',
        alternateName: 'Aladdin Education',
        url: 'https://aladdineducation.com',
        inLanguage: 'zh-CN',
        publisher: {
            '@type': 'EducationalOrganization',
            name: '阿拉仃教育',
        },
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://aladdineducation.com/guides?q={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
        },
    };

    return <JsonLd data={data} />;
}

interface ArticleJsonLdProps {
    title: string;
    description: string;
    url: string;
    datePublished: string;
    coverImage: string;
    tags: string[];
    category: string;
}

export function ArticleJsonLd({
    title,
    description,
    url,
    datePublished,
    coverImage,
    tags,
    category,
}: ArticleJsonLdProps) {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: description,
        url: url,
        datePublished: datePublished,
        dateModified: datePublished,
        image: `https://aladdineducation.com${coverImage}`,
        author: {
            '@type': 'Organization',
            name: '阿拉仃教育',
            url: 'https://aladdineducation.com',
        },
        publisher: {
            '@type': 'Organization',
            name: '阿拉仃教育',
            logo: {
                '@type': 'ImageObject',
                url: 'https://aladdineducation.com/logo.png',
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url,
        },
        keywords: tags.join(', '),
        articleSection: category,
        inLanguage: 'zh-CN',
    };

    return <JsonLd data={data} />;
}

interface BreadcrumbItem {
    name: string;
    url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };

    return <JsonLd data={data} />;
}

interface FAQItem {
    question: string;
    answer: string;
}

export function FAQJsonLd({ faqs }: { faqs: FAQItem[] }) {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };

    return <JsonLd data={data} />;
}
