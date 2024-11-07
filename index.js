import dotenv from "dotenv";
import express from "express";
import cors from 'cors';
import { handleUserSignUp } from "./src/controllers/user.controller.js";
import {handleAddStore} from './src/controllers/store.controller.js';
import { handleAddReview } from "./src/controllers/review.controller.js";
import { startMission } from "./src/controllers/mission.controller.js";
import {handleListStoreReviews} from './src/controllers/store.controller.js';
import {handleListUserReviews} from './src/controllers/review.controller.js';
//index.js
//메인 애플리케이션 실행 파일. 
//서버 시작, endpoint route 여기에 정의. 
dotenv.config();

//익스프레스 서버 초기화 
const app = express();
const port = process.env.PORT;
//store controller import 

app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/v1/users/signup", handleUserSignUp);

app.post('/api/v1/region/:regionId/store', handleAddStore);

app.post('/api/v1/store/:storeId/review', handleAddReview)

// app.post('/api/v1/store/:storeId/mission/:missionId/user/:userId/start', startMission);
// 목록 조회 - 닉네임, 작성시간, 별점, 텍스트 
// app.get('/api/v1/stores/:storeId/reviews', handleListStoreReviews)

app.get('/api/v1/user/:userId/reviews', handleListUserReviews);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});