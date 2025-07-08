import { apiClient } from "../../shared/api";
import type { IFilmsResponse } from "./films.types";

export const filmsApi = {
  getFilms: async (page: number) => {
    const limit = 50;
    return apiClient
      .get<IFilmsResponse>("/movie", {
        params: {
          page,
          limit,
        },
      })
      .then((res) => res.data.docs);
  },
};
