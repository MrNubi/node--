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
app.use(express.json());
app.use(express.urlencoded({ extend: true, limit: '700mb' }));
// 700mb정도면 사실상 제한이 없다고 봐도 무방
// app.use() 안의 인자에는 함수에 실행자(())가 붙어있다. 왜냐하면 저 자리에는 콜백함수가 들어가서
// use 에서 사용하는 엔드 포인트들은 다 get으로 통일

const today = new Date();
const todayToDayjs = dayjs(today).format('YY-MM-DD-hh-mm.ss');

//Get method
//=> 유저 정보 가져오기

app.get('/users', (req, res) => {});

//Post method
//=>유저 정보 생성하기
app.post('/users', (req, res) => {});

//Petch method
//=>유저 정보 수정하기
app.petch('/users', (req, res) => {});

//Delete method
//=>유저 정보 삭제하기
app.delete('/users', (req, res) => {});

// push method는 정보를 전체를 다 바꿈, 따라서 일반적으로 일부만 수정할 때는 petch 가 맞음

app.get('/', (req, res) => {
  res.send('Express');
});

app.listen(8000, () => {
  // app.listen(포트 넘버, 서버 실행 후 실행될 콜백함수)
  console.log('서버가동', todayToDayjs);
});
