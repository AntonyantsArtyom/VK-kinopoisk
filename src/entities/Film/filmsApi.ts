import { apiClient } from "../../shared/api";
import type { IFilm, IFilmFilters, IFilmsResponse, IGenre } from "./films.types";

export const filmsApi = {
  getGenres: async () => {
    return apiClient.get<IGenre[]>("v1/movie/possible-values-by-field?field=genres.name").then((res) => res.data);
  },

  getFilmById: async (id: string) => {
    return apiClient.get<IFilm>(`v1.4/movie/${id}`).then((res) => res.data);
  },

  getFilmsWithIds: async (ids: string[]) => {
    if (ids.length === 0) return [];
    const limit = 50;
    const query = ids.map((id) => `id=${id}`).join("&") + `&limit=${limit}`;
    return apiClient.get<IFilmsResponse>(`v1.4/movie?${query}`).then((res) => res.data.docs);
  },

  getFilms: async (page: number, filters: IFilmFilters) => {
    const limit = 50;
    const query: string[] = [];

    query.push(`page=${page}`);
    query.push(`limit=${limit}`);
    query.push(`rating.kp=${filters.rating_min || 0}-${filters.rating_max || 10}`);
    query.push(`year=${filters.year_start || 1990}-${filters.year_end || 2023}`);

    if (filters.genres?.length) {
      filters.genres.forEach((genre) => {
        query.push(`genres.name=${genre}`);
      });
    }

    const queryString = query.join("&");

    return apiClient.get<IFilmsResponse>(`v1.4/movie?${queryString}`).then((res) => res.data.docs);
  },
};
