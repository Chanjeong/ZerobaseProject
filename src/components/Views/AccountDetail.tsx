import styles from '../Assets/css/AccountDetail.module.css';
import { useLogin } from '../Provider/LoginProvider';
import { useParams } from 'react-router-dom';

export default function AccountDetail() {
    const { id } = useParams<{ id: string }>();
    const { loggedInUser } = useLogin();

    const account = loggedInUser?.account.find((v) => v.id === id);
    return (
        <div className={styles.detailContainer}>
            <div className={styles.budgetContainer}>
                <div className={styles.total}>
                    출금가능금액: <strong>{account?.money.toLocaleString()}</strong>원
                </div>
                <div className={styles.moneyInfo}>
                    <div className={styles.accountBank}>{account?.bank}</div>
                    <div className={styles.accountNumber}>
                        {account?.accountNum.slice(0, 6) +
                            '-' +
                            account?.accountNum.slice(6, 8) +
                            '-' +
                            account?.accountNum.slice(8)}
                    </div>
                </div>
            </div>
            <div className={styles.transactionContainer}>
                <div className={styles.header}>
                    <div className={styles.title}>지출내역</div>
                    <button className={styles.sendButton}>송금</button>
                </div>
                <div className={styles.transactionList}>
                    {account?.transaction.map((t) => (
                        <div className={styles.transactionContainer}>{t.type}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}
