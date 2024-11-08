import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

//회원가입 요청(POST) 처리. 

export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await userSignUp(bodyToUser(req.body)); //bodytoUser DTO 사용해서 데이터 한번 변환하여 전달. 
  //성공적으로 signup했으면, express의 res object사용해서 json 응답을 클라이언트로 돌려준다. 
  res.status(StatusCodes.OK).json({ result: user });
};


