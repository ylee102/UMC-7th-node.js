import {prisma} from "../db.config.js";

// 사용자 찾기 또는 없으면 새 사용자 생성
export const findOrCreateUser = async (userData) => {
  const { email, name } = userData;

  // 이메일로 사용자 찾기
  const user = await prisma.user.findUnique({
      where: { email: email },
  });

  // 사용자가 이미 존재하면 해당 사용자 반환
  if (user) {
      return user;
  }

  // 사용자가 없으면 새 사용자 생성
  const newUser = await prisma.user.create({
      data: {
          email: email,
          name: name,
      },
  });

  return newUser; // 새로 생성된 사용자 반환
};
export const addUser = async(data) => {
  const user = await prisma.user.findFirst({where: {email: data.email}});

  if(user) {
    return null;
  } 

  const created = await prisma.user.create({data: data});
  return created.id;

}

//사용자 정보 얻기
export const getUser = async (userId) => {
  const user = await prisma.user.findFirstOrThrow({where: {
    id: userId
  }});
  return user;
}

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
  await prisma.userFavorCategory.create({
    data: {
      userId: userId,
      foodCategoryId: foodCategoryId,
    },
  });
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  const preferences = await prisma.userFavorCategory.findMany({
    select: {
      id: true,
      userId: true,
      foodCategoryId: true,
      foodCategory: true,
    },
    where: { userId: userId },
    orderBy: { foodCategoryId: "asc" },
  });

  return preferences;
};
