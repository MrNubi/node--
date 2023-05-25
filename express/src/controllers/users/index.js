import Router from 'express';

// 서버에서 가장 기본이 되는 단위는 컨트롤러, express에서는 이걸 라우터 단위로 씀
// 응답을 주는 일련의 코드 블록이 콘트롤러
class UserController {
  router;
  path = '/users';
  //  일단 컨트롤러를 사용하는 이점 을 이용하기 위해서 라고 설명...
  users = [
    {
      id: 1,
      name: 'choi',
      age: '30',
    },
  ];
  constructor() {
    this.router = Router();
    // 라우터 등록
    this.init();
  }

  init() {
    this.router.get('/', this.getUsers.bind(this)); // bind시켜줌으로서  this를 호출될 때의 환경으로 맞춰줌 => 내부에서 this.users 사용가능
    this.router.get('/detail/:id', this.getUserDetail.bind(this));
    this.router.post('/', this.createUser.bind(this));
  }
  getUsers(res, req, next) {
    try {
      res.status(200).json({ users: this.users });
    } catch (err) {
      next(err);
    }
  }

  getUserDetail(res, req, next) {
    try {
      const { id } = req.params;

      const user = users.find((user) => {
        user.id === Number(id);
      });
      if (!user) {
        throw { status: 404, message: 'caanot find `user` value' };
      }

      res.status(200).json({ user });
    } catch (err) {
      next(err);
    }
  }

  createUser(res, req, next) {
    try {
      const { name, age } = req.body;
      console.log('body', req.body, 'name / age', name, age);

      this.users.push({
        id: new Date().getTime(),
        name,
        age,

        // id-> unique 값, 따라서 겹칠 일이 거의 없는 시간값 활용
        // js 문법: 인수=값 이름일 경우 생략가능 (name: name -> name)
      });
      res.status(201).json({ users: this.users });
    } catch (err) {
      next(err);
    }
  }
}

// 구글에 express error handlling 검색하면 try-catch문도 묶어서 쓰는 예제들 잘 나옴
// 하지만 어떤 에러처리를 했는지 한 눈에 알아보기 쉬우려면 이렇게 일일히 err처리를 해 주는게 나음
//취향차 -> 알아서

const userController = new UserController();
export default userController;
