import Hero from '@/components/Hero';
import Services from '@/components/Services';
import OfferShowcase from '@/components/OfferShowcase';
import HandbookShowcase from '@/components/HandbookShowcase';
import GuidesShowcase from '@/components/GuidesShowcase';
import VideoGallery from '@/components/VideoGallery';
import Contact from '@/components/Contact';
import Partners from '@/components/Partners';
import { OrganizationJsonLd, WebSiteJsonLd, FAQJsonLd } from '@/components/JsonLd';
import SpringBanner from '@/components/SpringBanner';
import FestiveParticles from '@/components/animations/FestiveParticles';
import FounderLetter from '@/components/FounderLetter';
import About from '@/components/About';
import BusinessScope from '@/components/BusinessScope';
import SocialMap from '@/components/SocialMap';

const faqs = [
  {
    question: '马来西亚留学需要雅思成绩吗？',
    answer: '大部分马来西亚公立大学要求雅思5.0-6.0分，但部分大学和专业接受MUET成绩替代雅思。如暂时没有语言成绩，部分学校也提供有条件录取（先读语言班再入学）。阿拉仃教育可协助您规划最佳语言方案。',
  },
  {
    question: '马来西亚留学一年费用大概多少？',
    answer: '马来西亚公立大学学费每年约1-3万人民币，私立大学每年约3-6万人民币。生活费每月约2000-4000人民币（含住宿、餐饮、交通）。整体花费约为欧美国家的1/3至1/4，性价比极高。',
  },
  {
    question: '马来西亚大学的学历中国认可吗？',
    answer: '是的。马来西亚绝大多数公立和私立大学的学历均获得中国教育部认证，毕业后可在中国留学服务中心办理学历认证，享受海归待遇，包括落户、报考公务员等优惠政策。',
  },
  {
    question: '申请马来西亚大学需要多长时间？',
    answer: '从准备材料到收到录取通知书，通常需要1-3个月。签证办理（EMGS）一般需要2-4个月。建议至少提前半年开始规划。阿拉仃教育全程协助，可大幅缩短等待时间。',
  },
  {
    question: '阿拉仃教育提供哪些服务？',
    answer: '我们提供全方位一站式留学服务，包括：升学规划与选校咨询、申请材料准备与递交、语言培训（雅思/MUET/PTE）、EMGS签证办理、境外接机与住宿安排、入学注册与学业支持等。从申请到毕业，全程陪伴。',
  },
];

export default function Home() {
  return (
    <>
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <FAQJsonLd faqs={faqs} />
      <SpringBanner />
      <FestiveParticles />
      <Hero />

      {/* 3D Social Map Section */}
      <section className="w-full h-[600px] md:h-[700px] bg-slate-900 relative">
        <div className="absolute top-8 left-0 right-0 z-10 text-center pointer-events-none">
          <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">阿拉仃全球社交地图</h2>
          <p className="text-slate-300 mt-2 text-sm md:text-base drop-shadow">查看各地的留学生分布，发现你的校友圈</p>
        </div>
        <SocialMap className="w-full h-full border-none" />
      </section>

      <FounderLetter />
      <Services />
      <BusinessScope />
      <HandbookShowcase />
      <OfferShowcase />
      <GuidesShowcase />
      <VideoGallery />
      <About />
      <Partners />
      <Contact />
    </>
  );
}
