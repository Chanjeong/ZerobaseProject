import styles from '../Assets/css/Home.module.css';

export default function Home() {
    return (
        <div className={styles.home}>
            <div className={styles.home_wrapper}>
                <div className={styles.greeting}>
                    <span style={{ color: '#FFBE0A	' }}>제로베이스 뱅크</span>
                    <span style={{ color: '#323232' }}>가 국민 곁에서</span>
                    <br /> 든든한 금융파트너가 되겠습니다
                </div>
            </div>
        </div>
    );
}
