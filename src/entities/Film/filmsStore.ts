import { observable, action, makeAutoObservable, runInAction, get } from "mobx";
import { filmsApi } from "./filmsApi";
import type { IFilm, IFilmFilters, IGenre } from "./films.types";

class FilmStore {
  @observable films: IFilm[] = [];
  @observable genres: IGenre[] = [];
  @observable filters: IFilmFilters = {};
  @observable page: number = 1;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  async setFilters(filters: IFilmFilters) {
    this.page = 1;
    this.films = [];
    this.filters = filters;
  }

  @action
  async getGenres() {
    this.genres = await filmsApi.getGenres();
  }

  @action
  async getFilmsFromPage(page: number) {
    this.page = page;
    const new_films = await filmsApi.getFilms(page, this.filters);
    runInAction(() => {
      this.films = [...this.films, ...new_films];
    });
  }
}

export const filmStore = new FilmStore();
