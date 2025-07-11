import { useEffect } from "react";
import { filmStore } from "../entities/Film/filmsStore";
import FilmsList from "../entities/Film/UI/FilmsList";
import getFiltersFromParams from "../features/FilmsFilter/helpers/getFiltersFromParams";
import FilmsFilter from "../features/FilmsFilter/UI/FilmsFilter";
import { observer } from "mobx-react-lite";

const HomePage = ({ onlyFavorites }: { onlyFavorites?: boolean }) => {
  useEffect(() => {
    filmStore.clearFilms();

    if (onlyFavorites) {
      filmStore.getFilmsWithIds(1, JSON.parse(localStorage.getItem("favorites") || "[]"));
      return;
    }
    filmStore.setFilters(getFiltersFromParams());
    filmStore.getFilmsFromPage(1);
    filmStore.getGenres();
  }, [onlyFavorites]);

  return (
    <>
      {}
      <FilmsFilter onlyFavorites={onlyFavorites} />
      <FilmsList onlyFavorites={onlyFavorites} />
    </>
  );
};

export default observer(HomePage);
