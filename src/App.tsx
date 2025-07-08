import { useEffect } from "react";
import { filmStore } from "./entities/Film/filmsStore";
import FilmsList from "./entities/Film/UI/FilmsList";
import { FilmsFilter } from "./features/FilmsFilter/FilmsFilter";

function App() {
  useEffect(() => {
    filmStore.getFilmsFromPage(2);
  }, []);

  return (
    <>
      <FilmsFilter />
      <FilmsList />
    </>
  );
}

export default App;
