import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import styles from '../Assets/css/Login.module.css';
import React, { FormEvent, ChangeEvent, useState, useEffect } from 'react';
import { useLogin } from '../Provider/LoginProvider';
import { useUser } from '../Provider/UserProvider';

//json-server --watch ./src/components/Data/db.json --port 3001

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setLoggedIn, setLoggedInUser, loggedInUser } = useLogin();
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

        const verifiedUser = user.find((u) => u.username === username && u.password === password);

        if (verifiedUser) {
            alert('제로베이스 뱅크에 오신걸 환영합니다');
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('loggedInUser', JSON.stringify(verifiedUser));
            setLoggedIn(true);
            setLoggedInUser(verifiedUser);
            navigate('/main');
        } else {
            alert('로그인 실패');
        }
    };

    // const handleGoogleLogin = () => {
    //     window.location.href =
    //         `https://accounts.google.com/o/oauth2/v2/auth?` +
    //         `client_id=789337969113-n63a76b4qnlfnibcq8enov3uhbu4vq02.apps.googleusercontent.com` +
    //         `&redirect_uri=http://localhost:3000/loading` +
    //         `&response_type=code` +
    //         `&scope=email profile`;
    // };

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
                    <button type="button" className={styles.googleButton}>
                        <FcGoogle className={styles.googleIcon} size={18} />
                        <p className={styles.google}>Google</p>
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
