import users from '../lib/data/users.json';

export const login = (username) => {
    const user = users.find((u) => u.username === username);
    if (user) {
        localStorage.setItem('user', JSON.stringify({ username }));
        return true;
    }    

    return false;
};
  
export const logout = () => localStorage.removeItem('user');
  
export const getUser = () => {
    if (typeof window !== 'undefined') {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    return null;
};  