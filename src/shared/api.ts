import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://api.kinopoisk.dev",
  headers: {
    "X-API-KEY": "C3CFT01-66944W8-H1JBGE9-5FN7YBG",
  },
});
