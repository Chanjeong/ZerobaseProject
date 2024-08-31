import styles from '../Assets/css/AccountDetail.module.css';
import { useLogin } from '../Provider/LoginProvider';
import { Link, useParams } from 'react-router-dom';

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
                    <Link to={`/main/${id}/send`}>
                        <button className={styles.sendButton}>송금</button>
                    </Link>
                </div>
                <div className={styles.transactionLists}>
                    {account?.transaction.map((t) => (
                        <div className={styles.transactionItem}>
                            <div className={styles.date}>{new Date(t.date).toLocaleString()}</div>
                            <div className={styles.receiver}>{t.name}</div>
                            {t.type === 'transfer' ? (
                                <div className={styles.money}>
                                    출금 <span style={{ color: '#e74c3c' }}>{t.money.toLocaleString()}</span>원
                                </div>
                            ) : (
                                <div className={styles.money}>
                                    입금 <span style={{ color: '#3498db' }}>{t.money.toLocaleString()}</span>원
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
