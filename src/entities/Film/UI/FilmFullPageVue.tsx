import { observer } from "mobx-react-lite";
import { ContentBadge, Text, Image, Button } from "@vkontakte/vkui";
import type { IFilm } from "../filmsTypes";
import styled from "styled-components";
import { useState } from "react";
import { BagdesAreaStyled } from "./reusedStyles";
import { Icon16StarCircle } from "@vkontakte/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useIsSmallScreen } from "../../../shared/hooks/useIsSmallScreen";

const FilmFullPageView = (film: IFilm) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const navigate = useNavigate();
  const isSmallScreen = useIsSmallScreen();

  return (
    <ContainerStyled $isSmallScreen={isSmallScreen}>
      <ImageAreaStyled>
        <BagdesAreaStyled>
          <ContentBadge size="l">{film.year + " год"}</ContentBadge>
          <ContentBadge size="l">
            {film.rating.kp}
            <ContentBadge.IconSlot>
              <Icon16StarCircle />
            </ContentBadge.IconSlot>
          </ContentBadge>
        </BagdesAreaStyled>
        {isImageLoading && film?.poster?.url && <ImageStyled noBorder src={`${import.meta.env.BASE_URL}placeholder-image.svg`} alt={film.name} />}
        <ImageStyled onLoad={() => setIsImageLoading(false)} noBorder src={film?.poster?.url ? film?.poster?.url : `${import.meta.env.BASE_URL}no-image.svg`} alt={film.name} />
      </ImageAreaStyled>
      <TextAreaStyled>
        <Text>{film.name || film.alternativeName}</Text>
        <Text>{film.description}</Text>
        {film.premiere?.world && <Text>премьера: {dayjs(film.premiere.world).format("DD.MM.YYYY")}</Text>}
        <GenresAreaStyled>
          {film.genres.map((genre) => (
            <ContentBadge key={genre.name}>{genre.name}</ContentBadge>
          ))}
        </GenresAreaStyled>
      </TextAreaStyled>
      <Button size="l" onClick={() => navigate("/")}>
        назад
      </Button>
    </ContainerStyled>
  );
};

export default observer(FilmFullPageView);

const ImageAreaStyled = styled.div`
  min-height: 250px;
`;

const ContainerStyled = styled.div<{ $isSmallScreen: boolean }>`
  display: grid;
  gap: 10px;
  padding: 10px;
  grid-template-columns: ${({ $isSmallScreen }) => ($isSmallScreen ? "1fr" : "400px 1fr")};
`;

const ImageStyled = styled(Image).attrs({
  heightSize: "100%",
  widthSize: "100%",
})``;

const TextAreaStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const GenresAreaStyled = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`;
