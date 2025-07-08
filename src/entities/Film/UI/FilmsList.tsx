import { observer } from "mobx-react-lite";
import { filmStore } from "../filmsStore";
import FilmCard from "./FilmCard";

function FilmsList() {
  return (
    <div>
      {filmStore.films.map((film) => (
        <FilmCard key={film.id} {...film} />
      ))}
    </div>
  );
}

export default observer(FilmsList);
