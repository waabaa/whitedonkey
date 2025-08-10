import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123!', 10);
  
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@nexus-ai.com' },
    update: {},
    create: {
      email: 'admin@nexus-ai.com',
      name: 'NEXUS AI Admin',
      role: 'SUPER_ADMIN',
      password: adminPassword,
    },
  });

  console.log('👤 Admin user created:', admin.email);

  // Create sample notices
  const notices = await Promise.all([
    prisma.notice.create({
      data: {
        title: 'NEXUS AI Platform 서비스 오픈',
        content: `
          <h3>NEXUS AI Platform에 오신 것을 환영합니다!</h3>
          <p>AI 마케팅과 블록체인 기술의 융합을 통해 새로운 비즈니스 기회를 창출하는 혁신적인 플랫폼이 정식 오픈했습니다.</p>
          
          <h4>주요 서비스</h4>
          <ul>
            <li>AI 기반 마케팅 솔루션 개발</li>
            <li>블록체인 기술을 활용한 시스템 구축</li>
            <li>AI × 블록체인 하이브리드 솔루션</li>
            <li>전문가 컨설팅 서비스</li>
          </ul>
          
          <p>지금 바로 협력 신청을 통해 여러분의 비즈니스를 혁신해보세요!</p>
        `,
        published: true,
        priority: true,
      },
    }),
    
    prisma.notice.create({
      data: {
        title: '협력 신청 절차 안내',
        content: `
          <h3>협력 신청 절차</h3>
          <p>NEXUS AI Platform과의 협력을 원하시는 기업 및 개인을 대상으로 신청 절차를 안내드립니다.</p>
          
          <h4>신청 단계</h4>
          <ol>
            <li><strong>온라인 신청</strong> - 협력 신청서 작성 및 제출</li>
            <li><strong>서류 검토</strong> - 제출된 서류 및 프로젝트 검토 (3-5일)</li>
            <li><strong>면담 진행</strong> - 프로젝트 상세 논의 및 기술 검토</li>
            <li><strong>협력 계약</strong> - 최종 계약 체결 및 프로젝트 시작</li>
          </ol>
          
          <h4>필요 서류</h4>
          <ul>
            <li>사업자등록증 (기업)</li>
            <li>프로젝트 기획서</li>
            <li>기술 요구사항 문서</li>
            <li>예산 계획서</li>
          </ul>
          
          <p>궁금한 사항이 있으시면 언제든지 문의해 주시기 바랍니다.</p>
        `,
        published: true,
        priority: false,
      },
    })
  ]);

  console.log('📢 Sample notices created:', notices.length);

  console.log('✅ Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });