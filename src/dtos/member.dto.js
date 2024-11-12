export const bodyToMember = (body) => {
    const inactiveDate = new Date(body.inactiveDate);
  
    return {
      email: body.email,
      name: body.name,
      nickname: body.nickname,
      gender: body.gender,
      inactiveDate,
      phone: body.phone_number,
      preferences: body.preferences,
    };
  };
  
  export const responseFromMember = (member, preferences) => {
    const preferFoods = preferences.map((preference) => preference.food.name);
  
    return {
      email: member.email,
      name: member.name,
      preferCategory: preferFoods,
    };
  };
  