import { Card, ContentBadge, Text, Image } from "@vkontakte/vkui";
import type { IFilm } from "../films.types";
import styled from "styled-components";
import { Icon16StarCircle, Icon28ThumbsUp, Icon28ThumbsUpOutline } from "@vkontakte/icons";
import { useState, type MouseEventHandler } from "react";
import { BagdesAreaStyled } from "./reusedStyles";
import { useNavigate } from "react-router-dom";
import { confirmModalStore } from "../../../shared/ConfirmModalStore";
import { filmStore } from "../filmsStore";

const FilmCard = ({ film, onlyFavorites }: { film: IFilm; onlyFavorites?: boolean }) => {
  const checkIsFavorite = () => localStorage.getItem("favorites")?.includes(film.id);

  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(checkIsFavorite());
  const navigate = useNavigate();

  const likeButtonClickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();

    const favorites: string[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    const isFavorite = favorites.includes(film.id);

    confirmModalStore.openModalWithText(isFavorite ? "Удалить из избранного?" : "Добавить в избранное?", () => {
      if (isFavorite) {
        localStorage.setItem("favorites", JSON.stringify(favorites.filter((id) => id !== film.id)));
        if (onlyFavorites) {
          filmStore.deleteFilmFromList(film.id);
        }
      } else {
        localStorage.setItem("favorites", JSON.stringify([...favorites, film.id]));
      }

      setIsFavorite(!isFavorite);
    });
  };

  return (
    <CardStyled onClick={() => navigate("/movie/" + film.id)}>
      <ImageAreaStyled>
        <BagdesAreaStyled>
          <ContentBadge size="l">{film.year + " год"}</ContentBadge>
          <ContentBadge size="l">
            {film.rating.kp}
            <ContentBadge.IconSlot>
              <Icon16StarCircle />
            </ContentBadge.IconSlot>
          </ContentBadge>
          <LikeBadgeStyled size="l" onClick={likeButtonClickHandler}>
            <ContentBadge.IconSlot>{isFavorite ? <Icon28ThumbsUp /> : <Icon28ThumbsUpOutline />}</ContentBadge.IconSlot>
          </LikeBadgeStyled>
        </BagdesAreaStyled>
        {isImageLoading && film?.poster?.url && <ImageStyled noBorder src={"/placeholder-image.svg"} alt={film.name} />}
        <ConditionalHideContainer hide={isImageLoading}>
          <ImageStyled onLoad={() => setIsImageLoading(false)} noBorder src={film?.poster?.url ? film?.poster?.url : "/no-image.svg"} alt={film.name} />
        </ConditionalHideContainer>
      </ImageAreaStyled>
      <NameStyled weight="2">{film.name || film.alternativeName}</NameStyled>
    </CardStyled>
  );
};

export default FilmCard;

const CardStyled = styled(Card)`
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding-bottom: 10px;
`;

const ImageAreaStyled = styled.div`
  position: relative;
`;

const ImageStyled = styled(Image).attrs({
  widthSize: "100%",
  heightSize: "100%",
})``;

const NameStyled = styled(Text)`
  padding: 5px 10px;
`;

const ConditionalHideContainer = styled.div<{ hide: boolean }>`
  max-height: ${({ hide }) => (hide ? "0" : "unset")};
  overflow: hidden;
`;

const LikeBadgeStyled = styled(ContentBadge)`
  margin-left: auto;
`;
