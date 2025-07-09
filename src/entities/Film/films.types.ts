export interface IFilmFilters {
  year_start?: number;
  year_end?: number;
  rating_min?: number;
  rating_max?: number;
  genres?: string[];
}

interface IRating {
  kp: number;
}

interface IPoster {
  url: string;
  previewUrl: string;
}

export interface IFilm {
  id: string;
  name?: string;
  alternativeName?: string;
  year: number;
  rating: IRating;
  poster: IPoster;
}

export interface IFilmsResponse {
  docs: IFilm[];
}
