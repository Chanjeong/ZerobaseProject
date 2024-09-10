import { useState } from 'react';
import styles from '../Assets/css/AccountDetail.module.css';
import { useLogin } from '../Provider/LoginProvider';
import { Link, useParams } from 'react-router-dom';
import { IoFilterSharp } from 'react-icons/io5';
import { FaRegChartBar } from 'react-icons/fa';

export default function AccountDetail() {
    const { id } = useParams<{ id: string }>();
    const [filter, setFilter] = useState<
        'recent' | 'oldest' | 'highAmount' | 'lowAmount' | 'transferOnly' | 'depositOnly'
    >('recent');
    const { loggedInUser } = useLogin();

    const account = loggedInUser?.account.find((v) => v.id === id);

    const sortedTransactions = () => {
        if (!account) return [];
        let transactions = [...account.transaction];

        switch (filter) {
            case 'recent':
                return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            case 'oldest':
                return transactions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            case 'highAmount':
                return transactions.sort((a, b) => b.money - a.money);
            case 'lowAmount':
                return transactions.sort((a, b) => a.money - b.money);
            case 'transferOnly':
                return transactions.filter((a) => a.type === 'transfer');
            case 'depositOnly':
                return transactions.filter((a) => a.type === 'deposit');
        }
    };

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
                    <div className={styles.titleContainer}>
                        <div className={styles.title}>지출내역</div>
                        <Link to={`/main/${id}/send`}>
                            <button className={styles.sendButton}>송금</button>
                        </Link>
                    </div>
                    <div className={styles.filterContainer}>
                        <IoFilterSharp />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value as any)}
                            className={styles.filterSelect}
                        >
                            <option value="recent">가장 최근순</option>
                            <option value="oldest">가장 나중순</option>
                            <option value="lowAmount">금액이 적은순</option>
                            <option value="highAmount">금액이 많은순</option>
                            <option value="transferOnly">지출된 경우만</option>
                            <option value="depositOnly">수입된 경우만</option>
                        </select>
                    </div>
                </div>
                <div className={styles.transactionLists}>
                    {sortedTransactions().map((t) => (
                        <div className={styles.transactionItem} key={new Date(t.date).toLocaleString()}>
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
            <Link to={`/main/${id}/chart`} className={styles.analyzeButton} aria-label="차트로 분석하기">
                <FaRegChartBar size={30} className={styles.chartIcon} />
            </Link>
        </div>
    );
}
