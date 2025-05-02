import users from "../lib/data/users.json";

export const login = (username) => {
  const user = users.find((u) => u.username === username);
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));

    // Dispatch a custom event to notify components about auth state change
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("storage"));
    }

    return true;
  }

  return false;
};

export const logout = () => {
  localStorage.removeItem("user");

  // Dispatch a custom event to notify components about auth state change
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("storage"));
  }
};

export const getUser = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  return null;
};
