import { useEffect } from "react";
import { filmStore } from "./entities/Film/filmsStore";
import FilmsList from "./entities/Film/UI/FilmsList";

function App() {
  useEffect(() => {
    filmStore.getFilmsFromPage(2);
  }, []);

  return (
    <>
      <FilmsList />
    </>
  );
}

export default App;
