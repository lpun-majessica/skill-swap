import loginService from "@/services/login";

export const login = async (credentials) => {
  const user = await loginService.login(credentials);
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    loginService.setUserToken(user.token);

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
  loginService.setUserToken(null);

  // Dispatch a custom event to notify components about auth state change
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("storage"));
  }
};

export const getUser = () => {
  try {
    if (
      typeof window !== "undefined" &&
      typeof localStorage !== "undefined" &&
      localStorage.getItem("user")
    ) {
      const user = localStorage.getItem("user");
      loginService.setUserToken(user.token);
      return JSON.parse(user);
    }
    return null;
  } catch (err) {
    console.error("Failed to parse user from localStorage", err);
    return null;
  }
};
