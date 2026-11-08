import { useState } from "react";

export const DiaryForm = () => {
  const [dateValue, setDateValue] = useState("");
  const [visibilityValue, setVisibilityValue] = useState("");
  const [weatherValue, setWeatherValue] = useState("");
  const [commentValue, setCommentValue] = useState("");

  const addDiaryEntryHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <h2>Add new entry</h2>
      <form onSubmit={addDiaryEntryHandler}>
        <label htmlFor="date">date</label>
        <input
          type="text"
          id="date"
          name="date"
          value={dateValue}
          onChange={(event) => setDateValue(event.target.value)}
        />
        <br />

        <label htmlFor="visibility">visibility</label>
        <input
          type="text"
          id="visibility"
          name="visibility"
          value={visibilityValue}
          onChange={(event) => setVisibilityValue(event.target.value)}
        />
        <br />

        <label htmlFor="weather">weather</label>
        <input
          type="text"
          id="weather"
          name="weather"
          value={weatherValue}
          onChange={(event) => setWeatherValue(event.target.value)}
        />
        <br />

        <label htmlFor="comment">comment</label>
        <input
          type="text"
          id="comment"
          name="comment"
          value={commentValue}
          onChange={(event) => setCommentValue(event.target.value)}
        />
        <br />

        <input type="submit" value="add" />
      </form>
      <br />
    </>
  );
};
