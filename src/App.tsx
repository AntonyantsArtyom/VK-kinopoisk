import { observer } from "mobx-react-lite";

import { AdaptivityProvider, AppRoot, ConfigProvider } from "@vkontakte/vkui";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import MoviePage from "./pages/MoviePage";

import { createGlobalStyle } from "styled-components";
import ConfirmModal from "./shared/ConfirmModal/ConfirmModal";
import { useEffect } from "react";
import { filmStore } from "./entities/Film/filmsStore";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html{
    overflow-y: auto !important;
    overflow-x: hidden;
  }
`;

const App = () => {
  useEffect(() => {
    filmStore.getGenres();
  }, []);

  return (
    <ConfigProvider colorScheme="light">
      <AdaptivityProvider>
        <BrowserRouter basename="/VK-kinopoisk">
          <AppRoot>
            <GlobalStyle />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/favorites" element={<HomePage onlyFavorites />} />
              <Route path="movie/:id" element={<MoviePage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
            <ConfirmModal />
          </AppRoot>
        </BrowserRouter>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default observer(App);
