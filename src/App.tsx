import { observer } from "mobx-react-lite";

import { AdaptivityProvider, AppRoot, ConfigProvider } from "@vkontakte/vkui";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <ConfigProvider colorScheme="light">
      <AdaptivityProvider>
        <AppRoot>
          <HomePage />
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default observer(App);
