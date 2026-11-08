import { useState, useEffect } from "react";
import { type Diary, type DiaryComplete } from "./types";
import { DiaryView } from "./components/DiaryView";
import { DiaryForm } from "./components/DiaryForm";
import diaryService from "./diaryService";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<Diary[]>([]);
  const [diaryEntriesComplete, setDiaryEntriesComplete] = useState<
    DiaryComplete[]
  >([]);

  useEffect(() => {
    diaryService.getAll().then((initialDiaryEntries) => {
      setDiaryEntries(initialDiaryEntries);
    });
  }, []);

  useEffect(() => {
    diaryService.getAllComplete().then((initialDiaryEntriesComplete) => {
      setDiaryEntriesComplete(initialDiaryEntriesComplete);
    });
  }, []);

  return (
    <div>
      <DiaryForm/>
      <DiaryView diary={diaryEntries} diaryComplete={diaryEntriesComplete} />
    </div>
  );
}

export default App;
