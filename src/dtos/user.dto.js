export const bodyToUser = (body) => {
  const birth = new Date(body.birth);

  return {
    email: body.email,
    name: body.name,
    gender: body.gender,
    birth,
    address: body.address,
    phoneNumber: body.phoneNumber,
    preferences: body.preferences,
  };
};

export const responseFromUser = ({ user, preferences }) => {
  if (!user || user.length === 0) {
    throw new Error("유저 정보를 찾을 수 없습니다.");
  }

  // user 데이터는 배열로 반환될 가능성이 있으므로 첫 번째 요소를 사용
  const userInfo = user[0];

  return {
    id: userInfo.id,
    email: userInfo.email,
    name: userInfo.name,
    gender: userInfo.gender,
    birth: userInfo.birth,
    address: userInfo.address,
    phoneNumber: userInfo.phone_number,
    preferences: preferences.map((pref) => ({
      id: pref.id,
      foodCategoryId: pref.food_category_id,
      name: pref.name,
    })),
  };
};
