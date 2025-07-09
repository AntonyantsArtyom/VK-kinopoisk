import { observable, action, makeAutoObservable, runInAction } from "mobx";
import { filmsApi } from "./filmsApi";
import type { IFilm, IFilmFilters } from "./films.types";

class FilmStore {
  @observable films: IFilm[] = [];
  @observable filter: IFilmFilters = {};

  constructor() {
    makeAutoObservable(this);
  }

  @action
  async setFilters(filters: IFilmFilters) {
    this.filter = filters;
  }

  @action
  async getFilmsFromPage(page: number) {
    const new_films = await filmsApi.getFilms(page);
    runInAction(() => (this.films = [...this.films, ...new_films]));
  }
}

export const filmStore = new FilmStore();
