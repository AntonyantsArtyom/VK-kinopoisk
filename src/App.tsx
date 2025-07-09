import { useEffect } from "react";
import { filmStore } from "./entities/Film/filmsStore";
import FilmsList from "./entities/Film/UI/FilmsList";
import FilmsFilter from "./features/FilmsFilter/UI/FilmsFilter";
import { observer } from "mobx-react-lite";

import { AdaptivityProvider, AppRoot, ConfigProvider } from "@vkontakte/vkui";

const App = () => {
  useEffect(() => {
    filmStore.getFilmsFromPage(1);
  }, []);

  return (
    <ConfigProvider colorScheme="light">
      <AdaptivityProvider>
        <AppRoot>
          <FilmsFilter />
          <FilmsList />
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default observer(App);
