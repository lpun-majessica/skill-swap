'use client';

const { createContext, useState, useEffect } = require("react");
import { login as loginUser, logout as logoutUser, getUser } from '@/utils/auth';

const AuthContext = createContext();

export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const storedUser = getUser();
        if(storedUser){
            setCurrentUser(storedUser);
        }
    }, []);

    const login = (username) => {
        const success = loginUser(username);
        if(success){
            const loggedInUser = getUser();
            setCurrentUser(loggedInUser);
        }
        return success;
    };

    const logout = () => {
        logoutUser();
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{currentUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
 
export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
  }