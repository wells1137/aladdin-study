import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const UNIVERSITIES = [
  { name: '马来亚大学', nameEn: 'University of Malaya (UM)', type: 'public' },
  { name: '博特拉大学', nameEn: 'Universiti Putra Malaysia (UPM)', type: 'public' },
  { name: '国民大学', nameEn: 'Universiti Kebangsaan Malaysia (UKM)', type: 'public' },
  { name: '理科大学', nameEn: 'Universiti Sains Malaysia (USM)', type: 'public' },
  { name: '泰莱大学', nameEn: "Taylor's University", type: 'private' },
  { name: '思特雅大学', nameEn: 'UCSI University', type: 'private' },
];

const MATERIAL_TEMPLATES: { name: string; nameEn?: string; category: string; isRequired: boolean }[] = [
  { name: '本科成绩单', nameEn: 'Undergraduate Transcript', category: 'academic', isRequired: true },
  { name: '毕业证书', nameEn: 'Graduation Certificate', category: 'academic', isRequired: true },
  { name: '学位证书', nameEn: 'Degree Certificate', category: 'academic', isRequired: true },
  { name: '研究计划书', nameEn: 'Research Proposal', category: 'academic', isRequired: true },
  { name: '护照扫描件', nameEn: 'Passport Copy', category: 'identity', isRequired: true },
  { name: '证件照', nameEn: 'Passport Photo', category: 'identity', isRequired: true },
  { name: '雅思/托福成绩单', nameEn: 'IELTS/TOEFL Score', category: 'language', isRequired: true },
  { name: '资金证明', nameEn: 'Financial Proof', category: 'financial', isRequired: true },
  { name: '推荐信', nameEn: 'Recommendation Letter', category: 'other', isRequired: true },
  { name: '个人陈述', nameEn: 'Personal Statement', category: 'other', isRequired: false },
  { name: '简历', nameEn: 'Resume/CV', category: 'other', isRequired: false },
];

async function main() {
  for (const u of UNIVERSITIES) {
    let uni = await prisma.university.findFirst({ where: { name: u.name } });
    if (!uni) {
      uni = await prisma.university.create({
        data: { ...u, country: '马来西亚' },
      });
    }
    for (let i = 0; i < MATERIAL_TEMPLATES.length; i++) {
      const t = MATERIAL_TEMPLATES[i];
      const exists = await prisma.materialTemplate.findFirst({
        where: { universityId: uni.id, name: t.name },
      });
      if (!exists) {
        await prisma.materialTemplate.create({
          data: {
            universityId: uni.id,
            name: t.name,
            nameEn: t.nameEn,
            category: t.category,
            isRequired: t.isRequired,
            sortOrder: i,
          },
        });
      }
    }
  }
  console.log('Seed: 6 universities and material templates created.');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
