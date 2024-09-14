import styles from '../Assets/css/Register.module.css';
import { useState, KeyboardEvent, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../Provider/UserProvider';
import { UserInfo } from '../Provider/UserProvider';

export default function Register() {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRe, setPasswordRe] = useState('');
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleKeyClick = (key: string) => {
        setPasswordRe((prevPasswordRe) => prevPasswordRe + key);
    };

    const handleClear = () => {
        setPasswordRe('');
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();
    };

    const checkCondition = async () => {
        if (password !== passwordRe) {
            alert('비밀번호를 다시 확인해주세요');
            return;
        }

        const usernameExists = user.some((u: UserInfo) => u.username === username);

        if (usernameExists) {
            alert('이미 존재하는 아이디입니다.');
            return;
        }
        try {
            const newUser = {
                username: username,
                name: name,
                password: password,
                account: [],
            };

            await axios.post('http://localhost:3001/users', newUser);
            alert('회원가입이 완료되었습니다!');
            navigate('/login');
        } catch (error) {
            console.error('사용자 추가 중 오류 발생:', error);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        checkCondition();
    };

    return (
        <div className={styles.registerContainer}>
            <div className={styles.registerTitle}>회원가입</div>
            <form className={styles.inputContainer} onSubmit={handleSubmit}>
                <div className={styles.idContainer}>
                    <label htmlFor="id" className={styles.labelId}>
                        아이디:
                    </label>
                    <input
                        type="text"
                        name="id"
                        id="id"
                        className={styles.inputId}
                        onChange={handleUsernameChange}
                        required
                    />
                </div>
                <div className={styles.nameContainer}>
                    <label htmlFor="name" className={styles.labelName}>
                        이름:
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className={styles.inputName}
                        onChange={handleNameChange}
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

                <div className={styles.passwordReContainer}>
                    <label htmlFor="passwordRe" className={styles.labelPasswordRe}>
                        비밀번호 다시:
                    </label>
                    <input
                        type="password"
                        name="passwordRe"
                        id="passwordRe"
                        value={passwordRe}
                        className={styles.inputPasswordRe}
                        onKeyDown={handleKeyDown}
                        required
                        readOnly
                    />
                    <div className={styles.keyboardContainer}>
                        {'1234567890qwertyuiopasdfghjklzxcvbnm'.split('').map((key) => (
                            <div
                                key={key}
                                className={styles.key}
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    handleKeyClick(key);
                                }}
                            >
                                {key}
                            </div>
                        ))}
                        <div
                            className={styles.key}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                handleClear();
                            }}
                        >
                            Clear
                        </div>
                    </div>
                </div>

                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.registerButton}>
                        가입하기
                    </button>
                </div>
            </form>
        </div>
    );
}
