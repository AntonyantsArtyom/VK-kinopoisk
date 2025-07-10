import styled from "styled-components";
import { Button, Text } from "@vkontakte/vkui";
import { useNavigate } from "react-router-dom";

const Error404TextStyled = styled(Text)`
  && {
    font-size: 48px;
    line-height: 48px;
  }
`;

const ContainerStyled = styled.div`
  width: 100%;
  height: 100dvh;
  display: grid;
  place-content: center;
  gap: 30px;
`;

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <ContainerStyled>
      <Error404TextStyled>404 not found</Error404TextStyled>
      <Button onClick={() => navigate("/")}>вернуться к списку фильмов</Button>
    </ContainerStyled>
  );
};

export default ErrorPage;
