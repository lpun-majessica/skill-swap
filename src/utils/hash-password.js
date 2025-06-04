import bcrypt from "bcrypt";

const hashPassword = async (userData, response, saltRounds = 10) => {
  if (!userData.password || userData.password.length < 3) {
    return response.json(
      { error: "Passwords must be at least 3 characters long." },
      { status: 400 },
    );
  }

  const passwordHash = await bcrypt.hash(userData.password, saltRounds);
  delete userData.password;

  return { ...userData, passwordHash };
};

export default hashPassword;
