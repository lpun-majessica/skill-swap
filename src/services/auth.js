import axios from "axios";
const baseUrl = "/api/auth";

const signIn = async (username, password) => {
  const credentials = { username, password };
  const response = await axios.post(
    `${process.env.AUTH_URL}/${baseUrl}/signin`,
    credentials,
  );
  return response.data;
};

const signUp = async (userData) => {
  const endpoint = process.env.AUTH_URL
    ? `${process.env.AUTH_URL}/${baseUrl}/signup`
    : `${baseUrl}/signup`;

  try {
    const response = await axios.post(endpoint, userData);
    return response.data;
  } catch (error) {
    console.log(error);
    const errorMessage = error.response.data.error;

    if (
      errorMessage.startsWith("E11000") &&
      errorMessage.includes("username")
    ) {
      throw new Error("This username has been taken.");
    } else if (
      errorMessage.startsWith("E11000") &&
      errorMessage.includes("email")
    ) {
      throw new Error("This email has been taken.");
    } else {
      throw new Error("Something went wrong, please try again :(");
    }
  }
};

export default { signIn, signUp };
