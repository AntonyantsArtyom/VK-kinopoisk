import { observer } from "mobx-react-lite";
import { filmStore } from "../filmsStore";
import FilmCard from "./FilmCard";
import { SimpleGrid } from "@vkontakte/vkui";
import { useEffect, useRef } from "react";

function FilmsList({ onlyFavorites }: { onlyFavorites?: boolean }) {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "1400px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && filmStore.films.length !== 0 && filmStore.films.length % 50 === 0) {
          if (onlyFavorites) {
            filmStore.getFilmsWithIds(filmStore.page + 1, JSON.parse(localStorage.getItem("favorites") || "[]"));
            return;
          }
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
        <FilmCard key={film.id} film={film} onlyFavorites={onlyFavorites} />
      ))}
      <div ref={loaderRef} />
    </SimpleGrid>
  );
}

export default observer(FilmsList);
