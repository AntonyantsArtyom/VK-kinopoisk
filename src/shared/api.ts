import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://api.kinopoisk.dev",
  headers: {
    "X-API-KEY": "6C8P75D-8K34HFE-JYS8DJS-TMNQN76",
  },
});
