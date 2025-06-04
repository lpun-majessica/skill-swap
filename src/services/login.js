import axios from "axios";
const baseUrl = "/api/login";

let userToken = null;

const setUserToken = (newToken) => {
  userToken = `Bearer: ${newToken}`;
};

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login, userToken, setUserToken };
