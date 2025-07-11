import { Icon16Search } from "@vkontakte/icons";
import { Button, Chip, ChipsSelect, CustomSelectOption, FormItem, FormLayoutGroup, Input, Text, type ChipOption } from "@vkontakte/vkui";
import styled from "styled-components";
import { useIsLargeScreen } from "../../../shared/hooks/useIsLargeScreen";
import { useIsSmallScreen } from "../../../shared/hooks/useIsSmallScreen";
import { ConditionalContainer } from "../../../shared/ConditionalContainer";
import { filmStore } from "../../../entities/Film/filmsStore";
import { observer } from "mobx-react-lite";

import { useEffect, useState } from "react";
import type { IFilmFilters } from "../../../entities/Film/films.types";
import setFiltersToParams from "../helpers/setFiltersToParams";
import getFiltersFromParams from "../helpers/getFiltersFromParams";
import { useNavigate } from "react-router-dom";

function FilmsFilter({ onlyFavorites }: { onlyFavorites?: boolean }) {
  const isLargeScreen = useIsLargeScreen();
  const isSmallScreen = useIsSmallScreen();
  const navigate = useNavigate();

  const [currentFiltersContent, setCurrentFiltersContent] = useState<IFilmFilters>({
    year_start: undefined,
    year_end: undefined,
    rating_min: undefined,
    rating_max: undefined,
    genres: [],
  });

  const handleInputChange = (key: keyof IFilmFilters) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const MIN_YEAR = 1990;
    const MAX_RATING = 10;

    let value = e.target.value.replace(/\D/g, "");
    if (key === "year_start" || key === "year_end") {
      value = value.slice(0, 4);
      let year = value === "" ? undefined : Number(value);

      if (key == "year_start" && year && year > 1000 && year < MIN_YEAR) {
        year = MIN_YEAR;
      }

      setCurrentFiltersContent((prev) => ({ ...prev, [key]: year }));
    }

    if (key === "rating_min" || key === "rating_max") {
      let rating: number | undefined = Number(value);
      if (value === "") {
        rating = undefined;
      } else if (rating > MAX_RATING) {
        rating = 10;
      }
      setCurrentFiltersContent((prev) => ({ ...prev, [key]: rating }));
    }
  };

  const handleGenresChange = (selected: ChipOption[]) =>
    setCurrentFiltersContent((prev) => ({
      ...prev,
      genres: selected.map((item) => String(item.value)),
    }));

  useEffect(() => {
    setCurrentFiltersContent(getFiltersFromParams());
    filmStore.setFilters(currentFiltersContent);
  }, []);

  const searchButtonClickHandler = () => {
    filmStore.setFilters(currentFiltersContent);
    setFiltersToParams(currentFiltersContent);
    filmStore.getFilmsFromPage(1);
  };

  const favoritesButtonClickHandler = () => {
    if (onlyFavorites) {
      navigate("/");
    } else {
      navigate("/favorites");
    }
  };

  if (onlyFavorites) {
    return (
      <FormStyled isLargeScreen={isLargeScreen} onSubmit={(e) => e.preventDefault()}>
        <FormButtonsAreaItemStyled>
          <Button onClick={favoritesButtonClickHandler} size="l">
            Вернуться ко всем фильмам
          </Button>
        </FormButtonsAreaItemStyled>
      </FormStyled>
    );
  }

  return (
    <FormStyled isLargeScreen={isLargeScreen} onSubmit={(e) => e.preventDefault()}>
      <FormGenresItemStyled isLargeScreen={isLargeScreen} htmlFor="genres" top="жанр">
        <ChipsSelect
          id="genres"
          value={currentFiltersContent.genres?.map((genre) => ({ value: genre, label: genre }))}
          onChange={handleGenresChange}
          options={filmStore.genres.map((genre) => {
            return {
              value: genre.name,
              label: genre.name,
            };
          })}
          placeholder="Все жанры"
          emptyText="ничего не найдено"
          selectedBehavior="hide"
          closeAfterSelect={false}
          allowClearButton={true}
          renderChip={({ value, label, ...rest }) => (
            <Chip value={value} {...rest}>
              {label}
            </Chip>
          )}
          renderOption={(props) => <CustomSelectOption {...props} />}
        />
      </FormGenresItemStyled>

      <ConditionalContainer renderContainer={!isLargeScreen} Container={ConditionalFlexGridContainerStyled} props={{ isSmallScreen }}>
        <FormLayoutGroup mode="horizontal">
          <FormYearItemStyled isSmallScreen={isSmallScreen} htmlFor="year_start" top="период">
            <Input id="year_start" placeholder="1990" value={currentFiltersContent.year_start ?? ""} onChange={handleInputChange("year_start")} before={<TextInputStyled color="secondary">после:</TextInputStyled>} after={<TextInputStyled>г.</TextInputStyled>} />
          </FormYearItemStyled>
          <FormYearItemStyled isSmallScreen={isSmallScreen} htmlFor="year_end">
            <Input id="year_end" placeholder={new Date().getFullYear().toString()} value={currentFiltersContent.year_end ?? ""} onChange={handleInputChange("year_end")} before={<TextInputStyled>до:</TextInputStyled>} after={<TextInputStyled>г.</TextInputStyled>} />
          </FormYearItemStyled>
        </FormLayoutGroup>

        <ConditionalContainer renderContainer={isSmallScreen} Container={ConditionalSmallViewFlexContainer}>
          <FormLayoutGroup mode="horizontal">
            <FormRatingItemStyled htmlFor="rating_min" top="рейтинг">
              <Input id="rating_min" placeholder="0" value={currentFiltersContent.rating_min ?? ""} onChange={handleInputChange("rating_min")} before={<TextInputStyled>от:</TextInputStyled>} />
            </FormRatingItemStyled>
            <FormRatingItemStyled htmlFor="rating_max">
              <Input id="rating_max" placeholder="10" value={currentFiltersContent.rating_max ?? ""} onChange={handleInputChange("rating_max")} before={<TextInputStyled>до:</TextInputStyled>} />
            </FormRatingItemStyled>
          </FormLayoutGroup>
          <FormButtonsAreaItemStyled>
            <Button onClick={favoritesButtonClickHandler} size="l">
              Избранное
            </Button>
            <Button onClick={searchButtonClickHandler} size="l" before={<Icon16Search />} />
          </FormButtonsAreaItemStyled>
        </ConditionalContainer>
      </ConditionalContainer>
    </FormStyled>
  );
}

export default observer(FilmsFilter);

const TextInputStyled = styled(Text)`
  padding: 0 5px;
  color: var(--vkui--color_icon_secondary);
`;

const FormYearItemStyled = styled(FormItem)<{ isSmallScreen: boolean }>`
  && {
    max-width: ${({ isSmallScreen }) => (isSmallScreen ? "unset" : "150px")};
    min-width: 150px;
  }
`;

const FormRatingItemStyled = styled(FormItem)`
  && {
    max-width: 100px;
    min-width: 80px;
  }
`;

const FormGenresItemStyled = styled(FormItem)<{ isLargeScreen: boolean }>`
  && {
    max-width: ${({ isLargeScreen }) => (isLargeScreen ? "400px" : "unset")};
    min-width: 275px;
  }
`;

const FormButtonsAreaItemStyled = styled(FormItem)`
  && {
    display: flex;
    justify-self: flex-end;
    align-self: flex-end;
    margin-left: auto;
    gap: 5px;
  }
`;

const ConditionalFlexGridContainerStyled = styled.div<{ isSmallScreen: boolean }>`
  display: ${({ isSmallScreen }) => (isSmallScreen ? "grid" : "flex")};
`;

const ConditionalSmallViewFlexContainer = styled.div`
  display: flex;
`;

const FormStyled = styled.form<{ isLargeScreen: boolean }>`
  display: ${({ isLargeScreen }) => (isLargeScreen ? "flex" : "grid")};
`;
