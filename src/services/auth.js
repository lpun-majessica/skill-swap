import axios from "axios";
const baseUrl = "/api/auth";

const signIn = async (username, password) => {
  const credentials = { username, password };
  const response = await axios.post(
    `${process.env.NEXTAUTH_URL}/${baseUrl}/signin`,
    credentials,
  );
  return response.data;
};

const signUp = async (userData) => {
  try {
    const response = await axios.post(`${baseUrl}/signup`, userData);
    return response.data;
  } catch (error) {
    console.log(error);
    const errorMessage = error.response.data.error;

    if (errorMessage.startsWith("E11000")) {
      throw new Error("This email has already been used.");
    }
  }
};

export default { signIn, signUp };
