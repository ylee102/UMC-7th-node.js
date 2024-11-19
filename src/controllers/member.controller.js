import { StatusCodes } from "http-status-codes";
import { bodyToMember } from "../dtos/member.dto.js";
import { memberSignUp } from "../services/member.service.js";

/**
 * 회원가입
 * @param {
    "email": "ylee123@gmail.com",
    "name": "이영석",
    "nickname": "맥스",
    "gender": "MALE",
    "phone_number": "010-4444-5555", 
    "preferences": [
        1
    ]
}
}} req 
 * @param {
    "result": {
        "email": "ylee123@gmail.com",
        "name": "이영석",
        "preferCategory": [
            "Pizza"
    ]
}
}
}*} res 
 * @param {*} next 
 */
export const handleMemberSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  try {
    const member = await memberSignUp(bodyToMember(req.body));
    res.status(StatusCodes.CREATED).success(member);
  } catch (error) {
    next(error);
  }
};
