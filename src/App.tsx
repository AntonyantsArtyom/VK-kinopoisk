import { observer } from "mobx-react-lite";

import { AdaptivityProvider, AppRoot, ConfigProvider } from "@vkontakte/vkui";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  return (
    <ConfigProvider colorScheme="light">
      <AdaptivityProvider>
        <BrowserRouter>
          <AppRoot>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </AppRoot>
        </BrowserRouter>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default observer(App);
