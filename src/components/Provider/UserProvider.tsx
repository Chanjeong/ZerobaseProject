import React, { ReactNode, useEffect, useContext, useState } from 'react';
import { createContext } from 'react';
import axios from 'axios';

export interface UserInfo {
    id: string;
    username: string;
    name: string;
    password: string;
    account: AccountInfo[];
}

export interface AccountInfo {
    id: string;
    accountNum: string;
    bank: string;
    money: number;
    password: string;
    transaction: transactionInfo[];
}
export interface transactionInfo {
    date: Date;
    name: string;
    account: string;
    type: 'transfer' | 'deposit';
    money: number;
}

interface UserProps {
    user: UserInfo[];
    setUser: (user: UserInfo[]) => void;
}

const UserContext = createContext<UserProps | undefined>(undefined);

export default function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserInfo[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get<UserInfo[]>('http://localhost:3001/users');
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUsers();
    }, [user]);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};
