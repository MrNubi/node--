import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dayjs from 'dayjs';

const app = express();

// express에서 미들웨어를 쓰는 법: app.use
app.use(
  cors() // () 안에 {origin : "대충 아무 url"} ->이런 식으로 사용, 서버 배포시 활용, 모든 요청을 허용할 경우 "*" 아니면 비워둠
);
app.use(helmet());

const today = new Date();
const todayToDayjs = dayjs(today).formet('YYYY-MM-DD');
app.get('/', (req, res) => {
  res.send('Express');
});

app.listen(8000, () => {
  // app.listen(포트 넘버, 서버 실행 후 실행될 콜백함수)
  console.log('서버가동', todayToDayjs);
});
