import type { IFilmFilters } from "../../../entities/Film/films.types";

const getFiltersFromParams = (): IFilmFilters => {
  const params = new URLSearchParams(window.location.search);

  const year_start = params.get("year_start");
  const year_end = params.get("year_end");
  const rating_min = params.get("rating_min");
  const rating_max = params.get("rating_max");
  const genres = params.get("genres");

  return {
    year_start: year_start ? Number(year_start) : undefined,
    year_end: year_end ? Number(year_end) : undefined,
    rating_min: rating_min ? Number(rating_min) : undefined,
    rating_max: rating_max ? Number(rating_max) : undefined,
    genres: genres ? genres.split("+") : undefined,
  };
};

export default getFiltersFromParams;
