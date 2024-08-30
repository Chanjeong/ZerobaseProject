import { ChangeEvent, FormEvent, KeyboardEvent, useState } from 'react';
import styles from '../Assets/css/CreateAccount.module.css';
import { useNavigate } from 'react-router-dom';
import { UserInfo, AccountInfo } from '../Provider/UserProvider';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useLogin } from '../Provider/LoginProvider';

export default function CreateAccount() {
    const [bank, setBank] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRe, setPasswordRe] = useState('');
    const { loggedInUser, setLoggedInUser } = useLogin();
    const navigate = useNavigate();

    const handleBankChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setBank(e.target.value);
    };

    const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNumber(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleKeyClick = (key: string) => {
        if (passwordRe.length < 6) {
            setPasswordRe((prevPasswordRe) => prevPasswordRe + key);
        }
    };

    const handleClear = () => {
        setPasswordRe('');
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();
    };

    const checkCondition = async () => {
        if (!/^\d+$/.test(number)) {
            alert('계좌번호는 숫자만 허용됩니다.');
            return;
        }
        if (number.length !== 14) {
            alert('계좌번호 14자리를 입력해주세요');
            return;
        }
        if (!/^\d+$/.test(password)) {
            alert('비밀번호는 숫자만 허용됩니다.');
            return;
        }

        if (password !== passwordRe) {
            alert('비밀번호를 다시 확인해주세요');
            return;
        }

        const accountExists = loggedInUser?.account.some((v) => v.accountNum === number);

        if (accountExists) {
            alert('이미 존재하는 계좌입니다.');
            return;
        }

        const generateAccountMoney = () => {
            return Math.floor(Math.random() * (10000 - 100 + 1)) * 100;
        };

        try {
            const newAccount: AccountInfo = {
                id: uuidv4(),
                bank: bank,
                accountNum: number,
                money: generateAccountMoney(),
                password: password,
                transaction: [],
            };

            if (!loggedInUser || !loggedInUser.id) {
                throw new Error('로그인된 사용자의 ID를 찾을 수 없습니다.');
            }

            const updatedUser: UserInfo = {
                ...loggedInUser,
                id: loggedInUser.id,
                account: [...loggedInUser.account, newAccount],
            };

            await axios.put(`http://localhost:3001/users/${loggedInUser.id}`, updatedUser);
            setLoggedInUser(updatedUser);

            alert(`계좌 연결이 완료되었습니다!`);
            navigate('/main');
        } catch (error) {
            console.error('사용자 추가 중 오류 발생:', error);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        checkCondition();
    };
    return (
        <div className={styles.createContainer}>
            <div className={styles.createTitle}>계좌 연결</div>
            <form className={styles.inputContainer} onSubmit={handleSubmit}>
                <div className={styles.bankContainer}>
                    <label htmlFor="name" className={styles.labelBank}>
                        은행:
                    </label>
                    <select name="bank" id="bank" className={styles.inputBank} onChange={handleBankChange} required>
                        <option value="" disabled selected>
                            은행을 선택하세요
                        </option>
                        <option value="신한">신한</option>
                        <option value="국민">국민</option>
                        <option value="하나">하나</option>
                        <option value="우리">우리</option>
                        <option value="IBK기업">IBK기업</option>
                        <option value="농협">농협</option>
                        <option value="제일">제일</option>
                        <option value="산업">산업</option>
                        <option value="토스">토스</option>
                        <option value="카카오">카카오</option>
                    </select>
                </div>
                <div className={styles.numberContainer}>
                    <label htmlFor="number" className={styles.labelNumber}>
                        계좌번호:
                    </label>
                    <input
                        type="password"
                        name="number"
                        id="number"
                        className={styles.inputNumber}
                        onChange={handleNumberChange}
                        maxLength={14}
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
                        maxLength={6}
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
                        maxLength={6}
                        required
                        readOnly
                    />
                    <div className={styles.keyboardContainer}>
                        {'1234567890'.split('').map((key) => (
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
                    <button type="submit" className={styles.createButton}>
                        생성하기
                    </button>
                </div>
            </form>
        </div>
    );
}
