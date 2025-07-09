import { observer } from "mobx-react-lite";
import { filmStore } from "../filmsStore";
import FilmCard from "./FilmCard";
import { SimpleGrid } from "@vkontakte/vkui";
import { useEffect, useRef } from "react";

function FilmsList() {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    filmStore.getFilmsFromPage(1);
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "1400px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && filmStore.films.length !== 0 && filmStore.films.length % 50 === 0) {
          filmStore.getFilmsFromPage(filmStore.page + 1);
        }
      });
    }, options);

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, []);

  return (
    <SimpleGrid minColWidth={300} gap="m" margin="auto">
      {filmStore.films.map((film) => (
        <FilmCard key={film.id} {...film} />
      ))}
      <div ref={loaderRef} />
    </SimpleGrid>
  );
}

export default observer(FilmsList);
