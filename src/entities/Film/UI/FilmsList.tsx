import { observer } from "mobx-react-lite";
import { filmStore } from "../filmsStore";
import FilmCard from "./FilmCard";

function FilmsList() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(200px, 1fr))", gap: "1rem" }}>
      {filmStore.films.map((film) => (
        <FilmCard key={film.id} {...film} />
      ))}
    </div>
  );
}

export default observer(FilmsList);
