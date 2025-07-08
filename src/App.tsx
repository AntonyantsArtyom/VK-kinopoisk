import { filmStore } from "./entities/Film/filmsStore";

function App() {
  filmStore.getFilmsFromPage(2);
  return <>HELLO WORLD</>;
}

export default App;
