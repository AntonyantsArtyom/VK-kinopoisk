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
