import { useEffect } from "react";
import { filmStore } from "../entities/Film/filmsStore";
import FilmsList from "../entities/Film/UI/FilmsList";
import getFiltersFromParams from "../features/FilmsFilter/helpers/getFiltersFromParams";
import FilmsFilter from "../features/FilmsFilter/UI/FilmsFilter";
import { observer } from "mobx-react-lite";

const HomePage = () => {
  useEffect(() => {
    filmStore.setFilters(getFiltersFromParams());
    filmStore.getFilmsFromPage(1);
    filmStore.getGenres();
  }, []);

  return (
    <>
      <FilmsFilter />
      <FilmsList />
    </>
  );
};

export default observer(HomePage);
