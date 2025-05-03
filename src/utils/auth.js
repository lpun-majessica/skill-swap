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
	try {
		const user = localStorage.getItem("user");
		return user ? JSON.parse(user) : null;
	} catch (err) {
		console.error("Failed to parse user from localStorage", err);
		return null;
	}
}
