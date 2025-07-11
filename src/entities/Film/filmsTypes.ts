export interface IFilmFilters {
  year_start?: number;
  year_end?: number;
  rating_min?: number;
  rating_max?: number;
  genres?: string[];
}

export interface IGenre {
  name: string;
}

interface IRating {
  kp: number;
}

interface IPoster {
  url: string;
  previewUrl: string;
}

interface IPremiere {
  world: string;
}

export interface IFilm {
  id: string;
  name?: string;
  alternativeName?: string;
  description?: string;
  year: number;
  rating: IRating;
  poster?: IPoster;
  premiere?: IPremiere;
  genres: IGenre[];
}

export interface IFilmsResponse {
  docs: IFilm[];
}
