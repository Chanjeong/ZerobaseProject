# Project Name

### [핀테크 프로젝트](https://github.com/Chanjeong/ZerobaseProject.git)

`입/출금 관리하는 핀테크 프로젝트`
연결된 계좌의 입금과 출금을 관리하고 있습니다. 먼저 로그인을 하고 로그인이 된 상태여야지 만 main페이지로 접근이 가능하고 상단바에도 그렇게 되게 설정으르 해놨습니다. 그리고 메인페이지에서 계좌연결을 할수 있고 연결된 계좌의 리스트들도 확인할 수 있습니다. 연결된 계좌를 누르면 상세내역 페이지로 이동하고 여기서 송금하기 및 나의 수입 지출등을 확인할수 있습니다. 지금은 실제 계좌의 연결을 하진 않았으나, 계좌를 연결하게 되면 랜덤한 양의 돈이 충전이 된 채로 계좌가 만들어지게 일단 설계를 해놨고, 그 계좌에서 입금과 출금이 가능하게 만들어졌습니다 그러면 계좌상세 페이지에서 입출금 내역을 바로 확인할수 있고, 눈으로 보기 쉽게 하기 위하여 차트로도 구현을 해놨습니다.

## Installation

`npm start`를 하면 되고, Data폴더에 `db.json`이 있는데 같이 실행을 시켜야 해서 같이 실행이 되게 설정을 해놨습니다. json-server --watch ./src/components/Data/db.json --port 3001

## Project Doc

### Built With

| package name     | version |
| ---------------- | ------- |
| React            | 18.3.1  |
| typescript       | 4.9.5   |
| axios            | 1.7.5   |
| clsx             | 2.1.1   |
| chart.js         | 4.4.4   |
| react-chartjs-2  | 5.2.0   |
| uuid             | 10.0.0  |
| react-dom        | 18.3.1  |
| react-icons      | 5.3.0   |
| react-router-dom | 6.26.1  |

### Pages

1. `src/components/Views/Home.tsx`: 홈화면페이지
2. `src/components/Views/ㅣLogin.tsx`: 로그인페이지
3. `src/components/Views/Register.tsx`: 회원가입 페이지
4. `src/components/Views/Main.tsx`: 메인페이지
5. `src/components/Views/PrivateRoute.tsx`: 로그인된 시에만 접근가능하도록 만든 라우터
6. `src/components/Views/CreateAccount.tsx`: 계좌연결페이지
7. `src/components/Views/AccountDetail.tsx`: 계좌상세페이지
8. `src/components/Views/Send.tsx`: 송금페이지
9. `src/components/Views/Chart.tsx`: 계좌차트페이지
10. `src/components/Layouts/Nav.tsx`: 상단바
11. `src/components/Layouts/Footer.tsx`: 하단바
12. `src/components/Provider/LoginProvider`: 로그인된 유저 정보 저장
13. `src/components/Provider/UserProvider.tsx`: API연결 후 데이터 관리
14. `src/components/Data/db.json`: 내부 API
15. `src/components/Assets/...`: View와 Layouts에 연결된 파일들에 css 및 images

### Configurations

### App.tsx

```jsx
import styles from './components/Assets/css/App.module.css';
import { BrowserRouter } from 'react-router-dom';
import Nav from './components/Layouts/Nav';
import Footer from './components/Layouts/Footer';
import Router from './components/Router/Router';
import { LoginProvider } from './components/Provider/LoginProvider';
import UserProvider from './components/Provider/UserProvider';

function App() {
    return (
        <UserProvider>
            <LoginProvider>
                <BrowserRouter>
                    <section className={styles.content}>
                        <Nav />
                        <section className={styles.main}>
                            <Router />
                        </section>
                        <Footer />
                    </section>
                </BrowserRouter>
            </LoginProvider>
        </UserProvider>
    );
}

export default App;
```

### Router.tsx

```jsx
import { Routes, Route } from 'react-router-dom';
import Login from '../Views/Login';
import Home from '../Views/Home';
import Register from '../Views/Register';
import Main from '../Views/Main';
import PrivateRoute from '../Views/PrivateRoute';
import CreateAccount from '../Views/CreateAccount';
import AccountDetail from '../Views/AccountDetail';
import Send from '../Views/Send';
import Chart from '../Views/Chart';

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute />}>
                <Route path="/main" element={<Main />} />
                <Route path="/main/create" element={<CreateAccount />} />
                <Route path="/main/:id" element={<AccountDetail />} />
                <Route path="/main/:id/send" element={<Send />} />
                <Route path="/main/:id/chart" element={<Chart />} />
            </Route>
        </Routes>
    );
}
```

## Information

-   [Pre기획](https://www.notion.so/Pre-06c5cfbb6859408b876927f4c6413a9e)
-   [개발계획](https://www.notion.so/d010fe4de2454d24955f65acf0c23f8d)
-   [API명세서](https://www.notion.so/API-fff0b10db41e800791e2f438b3794d06)
-   [데이터베이스](https://www.notion.so/678ac5ef47b0425c9edea11f3f9b5ea8)
-   [회고 및 트러블 슈팅](https://www.notion.so/c39a9ccbd8074e4bae9a92b732133eba)

## Author

-   [박찬정](https://github.com/Chanjeong)
