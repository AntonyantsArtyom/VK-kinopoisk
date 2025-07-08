export const FilmsFilter = () => {
  return (
    <div>
      <div>
        <label>
          жанр:
          <div>
            <label>
              <input type="checkbox" value="комедия" /> комедия
            </label>
            <label>
              <input type="checkbox" value="драма" /> драма
            </label>
            <label>
              <input type="checkbox" value="фэнтези" /> фэнтези
            </label>
            <label>
              <input type="checkbox" value="детектив" /> детектив
            </label>
            <label>
              <input type="checkbox" value="триллер" /> триллер
            </label>
            <label>
              <input type="checkbox" value="ужасы" /> ужасы
            </label>
            <label>
              <input type="checkbox" value="мелодрама" /> мелодрама
            </label>
            <label>
              <input type="checkbox" value="приключения" /> приключения
            </label>
          </div>
        </label>
        <label>
          рейтинг от: <input type="number" min="0" max="10" step="0.1" />
        </label>
        <label>
          рейтинг до: <input type="number" min="0" max="10" step="0.1" />
        </label>
        <label>
          год от: <input type="number" min="1895" max="2030" />
        </label>
        <label>
          год до: <input type="number" min="1895" max="2030" />
        </label>
      </div>
    </div>
  );
};
