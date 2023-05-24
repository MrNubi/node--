import express from 'express';
import Router from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dayjs from 'dayjs';
import Controllers from './controllers';
import controllers from './controllers';

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

//router 선언

Controllers.forEach((controller) => {
  app.use(controller.path, controller.router);
});

app.get('/', (req, res) => {
  res.send('Express');
});

app.listen(8000, () => {
  // app.listen(포트 넘버, 서버 실행 후 실행될 콜백함수)
  console.log('서버가동');
});

/* 
  const UserRouter = Router();

UserRouter.get('/', (req, res) => {
  res.status(200).json({ users });
  // 코드: 200, 타입 : json, 내용: users 객체
});
UserRouter.get('/detail:id', (req, res) => {
  res.status(200).json({ users });
  // 코드: 200, 타입 : json, 내용: users 객체
});

//Get /users/detail/:id
//user 한 명을 불러오는 api
UserRouter.get('/detail/:id', (req, res) => {
  const { id } = req.params;
  users.find((user) => {
    user.id === Number(id);
  });

  res.status(200).json({ users });
});

//Post /users
//유저를 생성하는 api

UserRouter.post('/', (req, res) => {
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

app.use('/users', UserRouter);

*/
