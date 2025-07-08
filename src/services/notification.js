import axios from "axios";
const baseUrl = "/api/notifs";

const getAllNotifications = async (userId) => {
  if (!userId) {
    return;
  }
  const response = await axios.get(`${baseUrl}?userId=${userId}`);
  return response.data;
};

const getNotification = async (notificationId) => {
  const response = await axios.get(`${baseUrl}/${notificationId}`);
  return response.data;
};

const createNotification = async (notification) => {
  const newNotification = {
    ...notification,
    isRead: notification.isRead ?? false,
  };
  const response = await axios.post(baseUrl, newNotification);
  return response.data;
};

const updateNotification = async (notificationId) => {
  const response = await axios.put(`${baseUrl}/${notificationId}`);
  return response.data;
};

const removeNotification = async (notificationId) => {
  const response = await axios.delete(`${baseUrl}/${notificationId}`);
  return response.data;
};

export default {
  getAllNotifications,
  getNotification,
  createNotification,
  updateNotification,
  removeNotification,
};
