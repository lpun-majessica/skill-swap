import axios from "axios";
const baseUrl = "/api/connections";

const getAllConnections = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addConnection = async (connection) => {
  const newConnection = {
    ...connection,
    isAccepted: connection.isAccepted ?? false,
  };
  const response = await axios.post(baseUrl, newConnection);
  return response.data;
};

const updateConnection = async (updatedConnection) => {
  const response = await axios.put(baseUrl, updatedConnection);
  return response.data;
};

const removeConnection = async (connection) => {
  const response = await axios.delete(baseUrl, { data: connection });
  return response.data;
};

const findConnection = async (currentUserId, userId) => {
  const response = await axios.get(
    `${baseUrl}/find?currentUserId=${currentUserId}&userId=${userId}`,
  );
  return response.data;
};

export default {
  getAllConnections,
  addConnection,
  updateConnection,
  removeConnection,
  findConnection,
};
