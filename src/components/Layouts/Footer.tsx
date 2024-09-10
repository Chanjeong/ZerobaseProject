import styles from '../Assets/css/Footer.module.css';
import visa from '../Assets/icons/visa.svg';
import master from '../Assets/icons/master.svg';
import americanExpress from '../Assets/icons/americanExpress.svg';
import paypal from '../Assets/icons/paypal.svg';
import dinersClub from '../Assets/icons/dinersClub.svg';
import discover from '../Assets/icons/discover.svg';
import { FaInstagram } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';

export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.payLink}>
                    <img className={styles.payment} src={visa} alt="visa" />
                    <img className={styles.payment} src={master} alt="master" />
                    <img className={styles.payment} src={americanExpress} alt="americanExpress" />
                    <img className={styles.payment} src={paypal} alt="paypal" />
                    <img className={styles.payment} src={dinersClub} alt="dinersClub" />
                    <img className={styles.payment} src={discover} alt="discover" />
                </div>
                <div className={styles.social}>
                    <a href="https://www.facebook.com/0base">
                        <FaFacebook color="white" />
                    </a>
                    <a href="https://www.instagram.com/zerobase.official">
                        <FaInstagram color="white" />
                    </a>
                    <a href="https://github.com/Chanjeong">
                        <FaGithub color="white" />
                    </a>
                </div>
                <div className={styles.year}>Copyright © 2024 Zerobase Bank</div>
            </div>
        </div>
    );
}
