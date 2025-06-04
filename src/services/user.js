import axios from "axios";
const baseUrl = "/api/users";

const getAllUsers = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getUser = async (userId) => {
  const response = await axios.get(`${baseUrl}/${userId}`);
  return response.data;
};

const addUser = async (userData) => {
  const response = await axios.post(baseUrl, userData);
  return response.data;
};

const updateUser = async (userId, userData) => {
  const response = await axios.put(`${baseUrl}/${userId}`, userData);
  return response.data;
};

const addTeachingSkill = async (userId, skillId) => {
  const response = await axios.post(`${baseUrl}/${userId}/teaching`, skillId);
  return response.data;
};

const deleteTeachingSkill = async (userId, skillId) => {
  const response = await axios.delete(`${baseUrl}/${userId}/teaching`, {
    data: skillId,
  });
  return response.data;
};

const addLearningSkill = async (userId, skillId) => {
  const response = await axios.post(`${baseUrl}/${userId}/learning`, skillId);
  return response.data;
};

const deleteLearningSkill = async (userId, skillId) => {
  const response = await axios.delete(`${baseUrl}/${userId}/learning`, {
    data: skillId,
  });
  return response.data;
};

export default {
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  addTeachingSkill,
  deleteTeachingSkill,
  addLearningSkill,
  deleteLearningSkill,
};
