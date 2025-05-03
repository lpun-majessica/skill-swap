'use client';

const { createContext, useState, useEffect, useContext } = require("react");
import { login as loginUser, logout as logoutUser, getUser } from '@/utils/auth';

const AuthContext = createContext();

export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState(getUser());
	const [isLoading, setIsLoading] = useState(true);


    const updateCurrentUser = (updatedFields) => {
        const storedUser = getUser();
        if (!storedUser) return;
    
        const updatedUser = { ...storedUser, ...updatedFields };
    
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setCurrentUser(updatedUser);
    };

	useEffect(() => {
		const user = getUser();
		setCurrentUser(user);
		setIsLoading(false);

		const handleStorageChange = () => {
			setCurrentUser(getUser());
		};

		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
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
		<AuthContext.Provider value={{ currentUser, updateCurrentUser, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}
 
export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
  }