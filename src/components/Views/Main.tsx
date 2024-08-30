import { useEffect } from 'react';
import styles from '../Assets/css/Main.module.css';
import { useLogin } from '../Provider/LoginProvider';
import { Link } from 'react-router-dom';

export default function Main() {
    const { loggedInUser, setLoggedInUser } = useLogin();
    console.log(loggedInUser?.account);

    return (
        <div className={styles.mainContainer}>
            <div className={styles.mainTitle}>연결된 계좌</div>
            <div className={styles.accountList}>
                {loggedInUser?.account.map((v) => (
                    <div className={styles.accountContainer} key={v.id}>
                        <div className={styles.accountOwner}>{loggedInUser.name}</div>
                        <div className={styles.bankInfo}>
                            <div className={styles.accountBank}>{v.bank}</div>
                            <div className={styles.accountNumber}>
                                {v.accountNum.slice(0, 6) +
                                    '-' +
                                    v.accountNum.slice(6, 8) +
                                    '-' +
                                    v.accountNum.slice(8)}
                            </div>
                        </div>
                        <div className={styles.accountTotal}>{v.money.toLocaleString()}원</div>
                    </div>
                ))}
            </div>
            <Link to="/main/create" className={styles.toCreate}>
                <div className={styles.createAccount}>+계좌 연결하기</div>
            </Link>
        </div>
    );
}
