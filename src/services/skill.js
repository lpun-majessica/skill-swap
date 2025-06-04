import axios from "axios";
const baseUrl = "/api/skills";

const getSkillList = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addSkill = async (name) => {
  const response = await axios.post(baseUrl, { name });
  return response.data;
};

export default { getSkillList, addSkill };
