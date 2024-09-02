import styles from '../Assets/css/Main.module.css';
import { useLogin } from '../Provider/LoginProvider';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Main() {
    const { loggedInUser, setLoggedInUser } = useLogin();

    const deleteAccount = async (accountId: String, e: React.MouseEvent) => {
        e.preventDefault();
        const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
        if (confirmDelete && loggedInUser) {
            const updatedAccounts = loggedInUser.account.filter((a) => a.id !== accountId);
            const updatedUser = { ...loggedInUser, account: updatedAccounts };

            alert('삭제되었습니다');
            await axios.put(`http://localhost:3001/users/${loggedInUser.id}`, updatedUser);
            setLoggedInUser(updatedUser);
        }
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.mainTitle}>연결된 계좌</div>
            <div className={styles.accountList}>
                {loggedInUser?.account.map((v) => (
                    <Link className={styles.toDetail} to={`/main/${v.id}`} key={v.id}>
                        <div className={styles.accountContainer}>
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
                            <div className={styles.deleteAccount} onClick={(e) => deleteAccount(v.id, e)}>
                                X
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <Link to="/main/create" className={styles.toCreate}>
                <button className={styles.createAccount}>+계좌 연결하기</button>
            </Link>
        </div>
    );
}
