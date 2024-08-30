import styles from '../Assets/css/Nav.module.css';
import { BsBank2 } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useLogin } from '../Provider/LoginProvider';
import { useEffect } from 'react';

export default function Nav() {
    const { loggedIn, setLoggedIn } = useLogin();

    useEffect(() => {
        const loggedInStatus = sessionStorage.getItem('loggedIn');
        setLoggedIn(loggedInStatus === 'true');
    }, [setLoggedIn]);

    const handleLoginLogout = () => {
        if (loggedIn) {
            sessionStorage.removeItem('loggedIn');
            setLoggedIn(false);
        }
    };

    return (
        <div className={styles.navContainer}>
            <Link className={styles.homeLink} to="/">
                <div className={styles.titleContainer}>
                    <BsBank2 className={styles.titleLogo} size={30} />
                    <div className={styles.title}>Zerobase Bank</div>
                </div>
            </Link>
            <div className={styles.tabs}>
                {loggedIn && (
                    <div className={styles.mainTab}>
                        <Link to="/main" className={styles.mainLink}>
                            Main
                        </Link>
                    </div>
                )}
                <div className={styles.loginTab} onClick={handleLoginLogout}>
                    <Link className={styles.loginLogoutLink} to="/login">
                        {loggedIn ? 'Logout' : 'Login'}
                    </Link>
                </div>
                <div className={styles.registerTab}>
                    <Link className={styles.registerLink} to="/register">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
}
