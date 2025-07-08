import { observable, action } from "mobx";
import { filmsApi } from "./filmsApi";
import type { IFilm } from "./films.types";

class FilmStore {
  @observable films: IFilm[] = [];

  @action.bound
  async getFilmsFromPage(page: number) {
    const new_films = await filmsApi.getFilms(page);
    this.films = [...this.films, ...new_films];
    console.log(this.films);
  }
}

export const filmStore = new FilmStore();
