import { Icon16Search } from "@vkontakte/icons";
import { Button, Chip, ChipsSelect, CustomSelectOption, FormItem, FormLayoutGroup, Input, Text } from "@vkontakte/vkui";
import styled from "styled-components";
import { useIsLargeScreen } from "../../shared/useIsLargeScreen";
import { useIsSmallScreen } from "../../shared/useIsSmallScreen";
import { ConditionalContainer } from "../../shared/ConditionalContainer";

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

export const FilmsFilter = () => {
  const isLargeScreen = useIsLargeScreen();
  const isSmallScreen = useIsSmallScreen();

  return (
    <FormStyled isLargeScreen={isLargeScreen} onSubmit={(e) => e.preventDefault()}>
      <FormGenresItemStyled isLargeScreen={isLargeScreen} htmlFor="groups" top="жанр">
        <ChipsSelect
          id="groups"
          options={[
            { value: "комедия", label: "комедия" },
            { value: "драма", label: "драма" },
            { value: "фэнтези", label: "фэнтези" },
            { value: "детектив", label: "детектив" },
            { value: "триллер", label: "триллер" },
            { value: "ужасы", label: "ужасы" },
            { value: "мелодрама", label: "мелодрама" },
            { value: "приключения", label: "приключения" },
          ]}
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
          renderOption={(props) => {
            return <CustomSelectOption {...props} />;
          }}
        />
      </FormGenresItemStyled>
      <ConditionalContainer renderContainer={!isLargeScreen} Container={ConditionalFlexGridContainerStyled} props={{ isSmallScreen }}>
        <FormLayoutGroup mode="horizontal">
          <FormYearItemStyled isSmallScreen={isSmallScreen} htmlFor="year_start" top="период">
            <Input id="year_start" placeholder="1990" before={<TextInputStyled color="secondary">после:</TextInputStyled>} after={<TextInputStyled>г.</TextInputStyled>} />
          </FormYearItemStyled>
          <FormYearItemStyled isSmallScreen={isSmallScreen} htmlFor="year_end">
            <Input id="year_end" placeholder="2025" before={<TextInputStyled>до:</TextInputStyled>} after={<TextInputStyled>г.</TextInputStyled>} />
          </FormYearItemStyled>
        </FormLayoutGroup>
        <ConditionalContainer renderContainer={isSmallScreen} Container={ConditionalSmallViewFlexContainer}>
          <FormLayoutGroup mode="horizontal">
            <FormRatingItemStyled htmlFor="rating_min" top="рейтинг">
              <Input id="rating_min" placeholder="0" before={<TextInputStyled>от:</TextInputStyled>} />
            </FormRatingItemStyled>
            <FormRatingItemStyled htmlFor="rating_max">
              <Input id="rating_max" placeholder="5" before={<TextInputStyled>до:</TextInputStyled>} />
            </FormRatingItemStyled>
          </FormLayoutGroup>
          <FormButtonsAreaItemStyled>
            <Button size="l" before={<Icon16Search />} />
          </FormButtonsAreaItemStyled>
        </ConditionalContainer>
      </ConditionalContainer>
    </FormStyled>
  );
};
