import type { IFilm } from "../films.types";

const FilmCard = (film: IFilm) => (
  <div>
    {film?.poster?.url && <img src={film?.poster?.url} alt={film.name} style={{ width: "200px" }} />}
    <h2>{film.name}</h2>
    <p>{film.year}</p>
    <p>{film.rating.kp}</p>
  </div>
);

export default FilmCard;
