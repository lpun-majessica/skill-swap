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
