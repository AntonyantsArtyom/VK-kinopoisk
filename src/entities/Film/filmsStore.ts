import { observable, action, makeAutoObservable, runInAction } from "mobx";
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
  clearFilms() {
    this.page = 1;
    this.films = [];
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

  @action
  async getFilmsWithIds(page: number, ids: string[]) {
    this.page = page;
    const limit = 50;
    const new_films = await filmsApi.getFilmsWithIds(ids.slice(page - 1, limit));
    runInAction(() => {
      this.films = [...this.films, ...new_films];
    });
  }
}

export const filmStore = new FilmStore();
