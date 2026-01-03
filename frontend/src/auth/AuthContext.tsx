import {createContext, useContext, useEffect, useState} from 'react';
import instance from '../api/axios';


interface User {
    id: string;
    role: `FREE` | `PRO` | `PRO_PLUS`;
}


interface AuthContextType {
    token: string | null;
    user: User | null;
    loading: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
    refreshUser: () => Promise<void>;
    isAuthenticated: boolean;

}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
      const [loading, setLoading] = useState(true);

      const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

  const fetchUser = async () => {
    const res = await instance.get('/auth/me');
    setUser(res.data);
  };
 


useEffect(() => {
  const initAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    setToken(token);
    try {
      await fetchUser(); // /auth/me
    } finally {
      setLoading(false);
    }
  };

  initAuth();
}, []);
    const login = (newToken: string) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
      fetchUser();
    };

    return (
        <AuthContext.Provider value={{
            token,
            user,
            loading,
            login,
            logout,
            refreshUser: fetchUser,  
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
