import React, { useState, ReactNode, useEffect } from 'react';
import { createContext, useContext } from 'react';
import { UserInfo } from './UserProvider';

interface LoginProp {
    loggedIn: boolean;
    setLoggedIn: (loggedIn: boolean) => void;
    loggedInUser: UserInfo | null;
    setLoggedInUser: (loggedInUser: UserInfo) => void;
}

const LoginContext = createContext<LoginProp | undefined>(undefined);

export function LoginProvider({ children }: { children: ReactNode }) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState<UserInfo | null>(null);

    useEffect(() => {
        const storedLoggedIn = sessionStorage.getItem('loggedIn') === 'true';
        const storedUser = sessionStorage.getItem('loggedInUser');
        if (storedLoggedIn && storedUser) {
            setLoggedInUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <LoginContext.Provider value={{ loggedIn, setLoggedIn, loggedInUser, setLoggedInUser }}>
            {children}
        </LoginContext.Provider>
    );
}

export function useLogin() {
    const context = useContext(LoginContext);
    if (context === undefined) {
        throw new Error('useLogin must be used within a LoginProvider');
    }
    return context;
}
