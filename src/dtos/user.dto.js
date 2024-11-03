export const bodyToUser = (body) => {
    //birth 필드를 Date로 파싱해서 변환. 
    const birth = new Date(body.birth);
  
    return {
      email: body.email,
      name: body.name,
      gender: body.gender,
      birth,
      address: body.address || "",
      detailAddress: body.detailAddress || "",
      phoneNumber: body.phoneNumber,
      preferences: body.preferences,
    };
  };

// user.dto.js

/**
 * Formats the user object and preferences into a structured response.
 * @param {Object} param0 - An object containing the user and their preferences.
 * @param {Object} param0.user - The user object.
 * @param {Array} param0.preferences - An array of the user's preferences.
 * @returns {Object} - A formatted response object.
 */
export const responseFromUser = ({ user, preferences }) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      birth: user.birth,
      address: user.address,
      detailAddress: user.detailAddress,
      phoneNumber: user.phoneNumber,
      preferences: preferences,  // Array of preferences
    };
  };
  