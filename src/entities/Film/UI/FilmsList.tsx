import { observer } from "mobx-react-lite";
import { filmStore } from "../filmsStore";
import FilmCard from "./FilmCard";
import { SimpleGrid } from "@vkontakte/vkui";

function FilmsList() {
  return (
    <SimpleGrid minColWidth={300} gap="m" margin="auto">
      {filmStore.films.map((film) => (
        <FilmCard key={film.id} {...film} />
      ))}
    </SimpleGrid>
  );
}

export default observer(FilmsList);
