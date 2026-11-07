import { useState } from "react";
import { type DiaryProp, type DiaryCompleteProp } from "../types";

export const DiaryView = ({
  diary,
  diaryComplete,
}: DiaryProp & DiaryCompleteProp) => {
  const [comments, setComments] = useState<boolean>(false);
  const [buttonValue, setButtonValue] = useState<string>("No");

  const showCommentsHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const nextComments = !comments;
    setComments(nextComments);
    setButtonValue(nextComments ? "Yes" : "No");

    console.log("comment? ", comments);
  };
  return (
    <>
      <form onSubmit={showCommentsHandler}>
        Show Comments? 
        <input type="submit" value={buttonValue}></input>
      </form>
      <div
        style={comments === false ? { display: "inline" } : { display: "none" }}
      >
        <h2>Diary Entries</h2>
        {diary.map((d) => (
          <div key={d.id}>
            <h3>{d.date}</h3>

            <p>Visibility: {d.visibility}</p>
            <p>Weather: {d.weather}</p>
          </div>
        ))}
      </div>

      <div
        style={comments === true ? { display: "inline" } : { display: "none" }}
      >
        <h2>Diary Entries</h2>
        {diaryComplete.map((d) => (
          <div key={d.id}>
            <h3>{d.date}</h3>

            <p>Visibility: {d.visibility}</p>
            <p>Weather: {d.weather}</p>
            <p>Comment: {d.comment}</p>
          </div>
        ))}
      </div>
    </>
  );
};
