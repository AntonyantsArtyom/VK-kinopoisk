import { Card, ContentBadge, Text, Image } from "@vkontakte/vkui";
import type { IFilm } from "../films.types";
import styled from "styled-components";
import { Icon16StarCircle } from "@vkontakte/icons";
import { useState } from "react";

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

const BagdesAreaStyled = styled.div`
  padding-left: 10px;
  padding-top: 10px;
  z-index: 10;
  position: absolute;
  display: flex;
  gap: 5px;
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

const FilmCard = (film: IFilm) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <CardStyled>
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
