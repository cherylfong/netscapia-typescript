import { useState } from "react";
import { isIsoDate, isWeather, isVisibility } from "../types";
import diaryService from "../diaryService";

interface DiaryFormProps {
  onEntryAdded: () => Promise<void>;
}

export const DiaryForm = ({ onEntryAdded }: DiaryFormProps) => {
  const [dateValue, setDateValue] = useState<string>("");
  const [visibilityValue, setVisibilityValue] = useState<string>("");
  const [weatherValue, setWeatherValue] = useState<string>("");
  const [commentValue, setCommentValue] = useState("");

  const [notifyMessage, setNotifyMessage] = useState("");

  const [addSuccess, setAddSuccess] = useState<boolean>(true);

  const addDiaryEntryHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!isIsoDate(dateValue)) {
      setAddSuccess(false);
      setNotifyMessage(`Error: Incorrect date: ${dateValue}: date is not ISO date format.`);
      setDateValue("");
      return;
    }

    if (!isVisibility(visibilityValue)) {
      setAddSuccess(false);
      setNotifyMessage(
        `Error: Incorrect visibility: ${visibilityValue}: must be one of the following: great, good, ok, poor.`,
      );
      setVisibilityValue("");
      return;
    }

    if (!isWeather(weatherValue)) {
      setAddSuccess(false);
      setNotifyMessage(
        `Error: Incorrect weather: ${weatherValue}: must be one of the following: sunny, rainy, cloudy, stormy, windy.`,
      );
      setWeatherValue("");
      return;
    }


    try {
      await diaryService.add({
        date: dateValue,
        weather: weatherValue,
        visibility: visibilityValue,
        comment: commentValue,
      });

      setAddSuccess(true);
      setNotifyMessage(
        `Diary entry for date: ${dateValue} is successfully added!`,
      );

      setDateValue("");
      setWeatherValue("");
      setVisibilityValue("");
      setCommentValue("");
      await onEntryAdded();
    } catch (error) {
      setAddSuccess(false);
      const message =
        error instanceof Error ? error.message : "An unknown error occurred";
      setNotifyMessage(`Error: ${message}`);
    }
  };

  return (
    <>
      <h2>Add new entry</h2>
      {addSuccess ? (
        notifyMessage !== "" && (
          <p id="notify" style={{ color: "green" }}>
            <b>{notifyMessage}</b>
          </p>
        )
      ) : (
        <p id="notify" style={{ color: "red" }}>
          <b>{notifyMessage}</b>
        </p>
      )}

      <form onSubmit={addDiaryEntryHandler}>
        <label htmlFor="date">date</label>
        <input
          type="date"
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
