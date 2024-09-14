import { useNavigate, useParams } from 'react-router-dom';
import styles from '../Assets/css/Send.module.css';
import { UserInfo, useUser } from '../Provider/UserProvider';
import { ChangeEvent, FormEvent, KeyboardEvent, useState } from 'react';
import { useLogin } from '../Provider/LoginProvider';
import axios from 'axios';

export default function Send() {
    const [bank, setBank] = useState('');
    const [account, setAccount] = useState('');
    const [money, setMoney] = useState('');
    const [password, setPassword] = useState('');
    const { id } = useParams<{ id: string }>();
    const { user, setUser } = useUser();
    const { loggedInUser, setLoggedInUser } = useLogin();
    const navigate = useNavigate();

    const handleBankChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBank(e.target.value);
    };

    const handleAccountChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAccount(e.target.value);
    };

    const handleMoneyChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMoney(e.target.value);
    };

    const handleKeyClick = (key: string) => {
        setPassword((prevPassword) => prevPassword + key);
    };

    const handleClear = () => {
        setPassword('');
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();
    };

    const checkCondition = async () => {
        const senderAccount = loggedInUser?.account.find((v) => v.id === id);
        const recipientUser = user.find((u) => u.account.find((a) => a.accountNum === account && a.bank === bank));

        if (!senderAccount) {
            alert('송금자의 계좌를 찾을 수 없습니다.');
            return;
        }
        if (!recipientUser) {
            alert('받는 사람의 계좌를 찾을 수 없습니다.');
            return;
        }
        if (senderAccount.password !== password) {
            alert('비밀번호를 확인하세요');
            return;
        }

        const recipientAccount = recipientUser.account.find((a) => a.accountNum === account);
        if (!recipientAccount) {
            alert('받는 사람의 계좌를 찾을 수 없습니다.');
            return;
        }

        if (senderAccount.money < Number(money)) {
            alert('잔액이 부족합니다.');
            return;
        }

        try {
            const senderNewBalance = senderAccount.money - Number(money);
            const recipientNewBalance = recipientAccount.money + Number(money);

            const updatedSender: UserInfo = {
                ...loggedInUser!,
                account: loggedInUser!.account.map((acc) =>
                    acc.id === senderAccount.id
                        ? {
                              ...acc,
                              money: senderNewBalance,
                              transaction: [
                                  ...acc.transaction,
                                  {
                                      date: new Date(),
                                      name: recipientUser.name,
                                      account: account,
                                      type: 'transfer',
                                      money: Number(money),
                                  },
                              ],
                          }
                        : acc
                ),
            };

            const updatedRecipient: UserInfo = {
                ...recipientUser,
                account: recipientUser.account.map((acc) =>
                    acc.id === recipientAccount.id
                        ? {
                              ...acc,
                              money: recipientNewBalance,
                              transaction: [
                                  ...acc.transaction,
                                  {
                                      date: new Date(),
                                      name: loggedInUser!.name,
                                      account: senderAccount.accountNum,
                                      type: 'deposit',
                                      money: Number(money),
                                  },
                              ],
                          }
                        : acc
                ),
            };

            await axios.patch(`http://localhost:3001/users/${loggedInUser?.id}`, updatedSender);
            await axios.patch(`http://localhost:3001/users/${recipientUser.id}`, updatedRecipient);

            setLoggedInUser(updatedSender);

            const updatedUsers = user.map((u) => (u.id === recipientUser.id ? updatedRecipient : u));
            setUser(updatedUsers);

            alert('송금이 완료되었습니다.');
            navigate(`/main/${id}`);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios Error:', error.message);
                console.error('Error Response:', error.response?.data);
                console.error('Error Config:', error.config);
            } else {
                console.error('Unknown Error:', error);
            }
        }
    };
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        checkCondition();
    };

    return (
        <div className={styles.sendContainer}>
            <div className={styles.sendTitle}>송금하기</div>
            <form className={styles.inputContainer} onSubmit={handleSubmit}>
                <div className={styles.bankContainer}>
                    <label htmlFor="bank" className={styles.labelBank}>
                        은행:
                    </label>
                    <input
                        type="text"
                        name="bank"
                        id="bank"
                        className={styles.inputBank}
                        onChange={handleBankChange}
                        required
                    />
                </div>
                <div className={styles.accountContainer}>
                    <label htmlFor="account" className={styles.labelAccount}>
                        계좌번호:
                    </label>
                    <input
                        type="text"
                        name="account"
                        id="account"
                        className={styles.inputAccount}
                        onChange={handleAccountChange}
                        required
                    />
                </div>
                <div className={styles.moneyContainer}>
                    <label htmlFor="money" className={styles.labelMoney}>
                        금액:
                    </label>
                    <input
                        type="money"
                        name="money"
                        id="money"
                        className={styles.inputPassword}
                        onChange={handleMoneyChange}
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
                        value={password}
                        className={styles.inputPassword}
                        onKeyDown={handleKeyDown}
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
                    <button type="submit" className={styles.sendButton}>
                        송금
                    </button>
                </div>
            </form>
        </div>
    );
}
