import { Card, Text } from "@vkontakte/vkui";
import type { IFilm } from "../films.types";

const FilmCard = (film: IFilm) => (
  <Card>
    {film?.poster?.url && <img src={film?.poster?.url} alt={film.name} style={{ width: "100%" }} />}
    <Text>{film.name}</Text>
    <Text>{film.year}</Text>
    <Text>{film.rating.kp}</Text>
  </Card>
);

export default FilmCard;
