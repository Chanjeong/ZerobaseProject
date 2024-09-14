import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { SiKakaotalk } from 'react-icons/si';
import { SiNaver } from 'react-icons/si';
import styles from '../Assets/css/Login.module.css';
import { FormEvent, ChangeEvent, useState } from 'react';
import { useLogin } from '../Provider/LoginProvider';
import { useUser } from '../Provider/UserProvider';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setLoggedIn, setLoggedInUser } = useLogin();
    const { user } = useUser();
    const navigate = useNavigate();

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Username:', username);
        console.log('Password:', password);

        // user 데이터가 정상적으로 로드되었는지 확인
        console.log('User Data:', user);

        const verifiedUser = user.find((u) => u.username === username && u.password === password);

        if (verifiedUser) {
            alert('제로베이스 뱅크에 오신걸 환영합니다');
            sessionStorage.setItem('loggedIn', 'true');
            sessionStorage.setItem('loggedInUser', JSON.stringify(verifiedUser));
            setLoggedIn(true);
            setLoggedInUser(verifiedUser);
            navigate('/main');
        } else {
            alert('로그인 실패');
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginTitle}>로그인</div>
            <form onSubmit={handleSubmit} className={styles.inputContainer}>
                <div className={styles.idContainer}>
                    <label htmlFor="username" className={styles.labelId}>
                        아이디:
                    </label>
                    <input
                        type="text"
                        name="id"
                        id="username"
                        className={styles.inputId}
                        onChange={handleUsernameChange}
                        required
                    />
                </div>
                <div className={styles.passwordContainer}>
                    <label htmlFor="password" className={styles.labelPassword}>
                        비밀번호:
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className={styles.inputPassword}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <div className={styles.socialLogin}>
                    {/* 소셜로그인 구현은 아직 안되고 일단 버튼만 만들어 놨습니다. */}
                    <button type="button" className={styles.kakaoButton}>
                        <SiKakaotalk size={18} style={{ color: 'yellow', backgroundColor: 'black' }} />
                        <p className={styles.kakao}>Kakao</p>
                    </button>
                    <button type="button" className={styles.googleButton}>
                        <FcGoogle size={18} />
                        <p className={styles.google}>Google</p>
                    </button>
                    <button type="button" className={styles.naverButton}>
                        <SiNaver size={18} color="#03C161" />
                        <p className={styles.naver}>Naver</p>
                    </button>
                </div>
                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.submitButton}>
                        로그인
                    </button>
                    <Link to={'/register'} className={styles.toRegister}>
                        <button className={styles.toRegisterButton}>회원가입</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}
