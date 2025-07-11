import { useEffect, useState } from "react";
import { filmsApi } from "../entities/Film/filmsApi";
import { observer } from "mobx-react-lite";
import type { IFilm } from "../entities/Film/filmsTypes";
import FilmFullPageVue from "../entities/Film/UI/FilmFullPageVue";
import { Spinner } from "@vkontakte/vkui";

const MoviePage = () => {
  const [film, setFilm] = useState<IFilm | null>(null);

  useEffect(() => {
    const url = window.location.pathname;
    const filmId = url.split("/").at(-1);
    if (filmId) {
      filmsApi.getFilmById(filmId).then((film) => setFilm(film));
    }
  }, []);

  return <>{film ? <FilmFullPageVue {...film} /> : <Spinner size="xl" />}</>;
};

export default observer(MoviePage);
