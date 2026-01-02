import {createContext, useContext, useEffect, useState} from 'react';
import { decodeJWT } from './jwt';


interface User {
    id: string;
    role: `FREE` | `PRO` | `PRO_PLUS`;
}


interface AuthContextType {
    token: string | null;
    user: User | null;
    login: (token: string, user: User) => void;
    logout: () => void;
    isAuthenticated: boolean;

}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

      const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };


    useEffect(() => {
        const storedToken = localStorage.getItem('token');

        if (!storedToken) return;

        const decoded = decodeJWT(storedToken);

        if (decoded) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setToken(storedToken);
            setUser(decoded);
        } else {
            logout();
        }
    }, []);
    const login = (newToken: string, newUser: User) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(newUser);

        const payload = JSON.parse(atob(newToken.split('.')[1]));
        setUser({ id: payload.id, role: payload.role });
    };

    return (
        <AuthContext.Provider value={{
            token,
            user,
            login,
            logout,
            isAuthenticated: !!token,

        }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = ()  => {
    const context = useContext(AuthContext); 
    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    } 
    return context;
};
