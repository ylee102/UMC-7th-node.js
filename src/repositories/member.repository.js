import { prisma } from "../db.config.js";

// User 데이터 삽입
export const addMember = async (data) => {
  const member = await prisma.member.findFirst({
    where: { email: data.email },
  });

  if (member) {
    return null;
  }

  const created = await prisma.member.create({ 
    data:{
    email: data.email || null,
    name: data.name || null,
    gender: data.gender || null,
    phone_number: data.phone || null
    }
  },);
  return created.id;
};

// 사용자 정보 얻기
export const getMember = async (memberId) => {
  const member = await prisma.member.findFirstOrThrow({
    where: { id: memberId },
  });

  return member;
};

// 음식 선호 카테고리 매핑
export const addMemberFood = async (memberId, foodId) => {
  await prisma.MemberFood.create({
    data: {
      memberId: memberId,
      foodId: foodId,
    },
  });
};

// 사용자 선호 카테고리 반환
export const getMemberFoodByMemberId = async (memberId) => {
  const preferences = await prisma.MemberFood.findMany({
    select: {
      id: true,
      memberId: true,
      foodId: true,
      food: true,
    },
    where: { memberId: memberId },
    orderBy: { foodId: "asc" },
  });

  return preferences;
};
