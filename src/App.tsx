import styles from './components/Assets/css/App.module.css';
import { BrowserRouter } from 'react-router-dom';
import Nav from './components/Layouts/Nav';
import Footer from './components/Layouts/Footer';
import Router from './components/Router/Router';
import { LoginProvider } from './components/Provider/LoginProvider';
import UserProvider from './components/Provider/UserProvider';

function App() {
    return (
        <UserProvider>
            <LoginProvider>
                <BrowserRouter>
                    <section className={styles.content}>
                        <Nav />
                        <section className={styles.main}>
                            <Router />
                        </section>
                        <Footer />
                    </section>
                </BrowserRouter>
            </LoginProvider>
        </UserProvider>
    );
}

export default App;
