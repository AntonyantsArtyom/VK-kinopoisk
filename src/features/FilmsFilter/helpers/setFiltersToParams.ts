import type { IFilmFilters } from "../../../entities/Film/films.types";

const setFiltersToParams = (filters: IFilmFilters): void => {
  const params = new URLSearchParams();
  if (filters.year_start) params.set("year_start", filters.year_start.toString());
  if (filters.year_end) params.set("year_end", filters.year_end.toString());
  if (filters.rating_min) params.set("rating_min", filters.rating_min.toString());
  if (filters.rating_max) params.set("rating_max", filters.rating_max.toString());
  if (filters.genres?.length && filters.genres?.length > 0) params.set("genres", filters.genres.join("+"));

  const queryString = params.toString();
  if (queryString.length > 0) {
    const newUrl = `${window.location.pathname}?${queryString}`;
    window.history.replaceState(null, "", newUrl);
  }
};

export default setFiltersToParams;
