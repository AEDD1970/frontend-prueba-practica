import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:3002/api",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
      }
});

const apiHelper = {
  async get(path, params) {
    try {
      const response = await axiosInstance.get(path, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async post(path, data) {
    try {
      const response = await axiosInstance.post(path, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async patch(path, data) {
    try {
      const response = await axiosInstance.patch(path, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async delete(path, params) {
    try {
      const response = await axiosInstance.delete(path, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default apiHelper;