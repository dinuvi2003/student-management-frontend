import axios from "axios";

const API_URL = "http://localhost:8080";

export const login = async (username: string, password: string) => {
  const token = btoa(`${username}:${password}`);

  return axios.get(`${API_URL}/api/auth/login`, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
};