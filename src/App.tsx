import { observer } from "mobx-react-lite";

import { AdaptivityProvider, AppRoot, ConfigProvider } from "@vkontakte/vkui";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import MoviePage from "./pages/MoviePage";

import { createGlobalStyle } from "styled-components";
import ConfirmModal from "./shared/ConfirmModal";

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
  return (
    <ConfigProvider colorScheme="light">
      <AdaptivityProvider>
        <BrowserRouter>
          <AppRoot>
            <GlobalStyle />
            <Routes>
              <Route path="/" element={<HomePage />} />
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
