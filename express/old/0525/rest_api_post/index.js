import { express, Router } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dayjs from 'dayjs';

const app = express();
const UserRouter = Router();

let users = [
  {
    id: 1,
    name: 'choi',
    age: '30',
  },
];

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
// Query or Path로 받게 됨(정보를)
// 성공: 200
app.get('/users', (req, res) => {
  res.status(200).json({ users });
  // 코드: 200, 타입 : json, 내용: users 객체
});

//Post method
//=>유저 정보 생성하기
// 성공: 201
// 요청: body로 많이 받음(정보를)

app.post('/users', (req, res) => {
  const { name, age } = req.body;
  console.log('body', req.body, 'name / age', name, age);

  users.push({
    id: new Date().getTime(),
    name,
    age,

    // id-> unique 값, 따라서 겹칠 일이 거의 없는 시간값 활용
    // js 문법: 인수=값 이름일 경우 생략가능 (name: name -> name)
  });
  res.status(201).json({ users });
});

//Petch method
//=>유저 정보 수정하기
// 성공: 204
// path variable 만들어주기 : 이 아이디라고 명명된 값에는 어떤 것도 들어갈 수 있음
// 접근 방법: req.params.id
app.patch('/users:id', (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
  console.log('params', req.params, 'id', id);
  const targetUserIdx = users.findIndex((user) => {
    let returnId = user.id === Number(id);

    return returnId;
  });

  users[targetUserIdx] = {
    id: users[targetUserIdx].id,
    name: name ?? users[targetUserIdx].name, // name ? name : users[targetUserIdx].name, 의 간략화. name이 없으면 뒤를 쓰겠다
    age: age ?? users[targetUserIdx].age,
  };

  res.status(204).json({});
  // 204 이후에는 요청이 정상적으로 잘 처리됬다는 일종의 약속으로 빈 JSON을 보냄
});

//Delete method
//=>유저 정보 삭제하기
// 성공: 204

app.delete('/users:id', (req, res) => {
  const { id } = req.params;
  const deletedUsers = users.filter((user) => user.id !== Number(id));
  // 삭제하고 싶은 id의 유저만 필터링한 객체를 리턴 -> 결과적으로 타겟 id의 유저만 삭제
  users = deletedUsers;
  res.status(204).json({});
});

// push method는 정보를 전체를 다 바꿈, 따라서 일반적으로 일부만 수정할 때는 petch 가 맞음

app.get('/', (req, res) => {
  res.send('Express');
});

app.listen(8000, () => {
  // app.listen(포트 넘버, 서버 실행 후 실행될 콜백함수)
  console.log('서버가동', todayToDayjs);
});
