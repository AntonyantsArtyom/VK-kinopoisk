import { makeAutoObservable, runInAction } from "mobx";
import { filmsApi } from "./filmsApi";
import type { IFilm, IFilmFilters, IGenre } from "./filmsTypes";

class FilmStore {
  films: IFilm[] = [];
  genres: IGenre[] = [];
  filters: IFilmFilters = {};
  page: number = 1;

  constructor() {
    makeAutoObservable(this);
  }

  clearFilms() {
    this.page = 1;
    this.films = [];
  }

  deleteFilmFromList(id: string) {
    this.films = this.films.filter((film) => film.id !== id);
  }

  async setFilters(filters: IFilmFilters) {
    this.page = 1;
    this.films = [];
    this.filters = filters;
  }

  async getGenres() {
    this.genres = await filmsApi.getGenres();
  }

  async getFilmsFromPage(page: number, signal?: AbortSignal) {
    this.page = page;
    const new_films = await filmsApi.getFilms(page, this.filters, signal);
    runInAction(() => {
      this.films = [...this.films, ...new_films];
    });
  }

  async getFilmsWithIds(page: number, ids: string[], signal?: AbortSignal) {
    this.page = page;
    const limit = 50;
    const new_films = await filmsApi.getFilmsWithIds(ids.slice(page - 1, limit), signal);
    runInAction(() => {
      this.films = [...this.films, ...new_films];
    });
  }
}

export const filmStore = new FilmStore();
