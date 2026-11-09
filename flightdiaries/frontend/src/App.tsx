import { useState, useEffect, useCallback } from "react";
import { type Diary, type DiaryComplete } from "./types";
import { DiaryView } from "./components/DiaryView";
import { DiaryForm } from "./components/DiaryForm";
import diaryService from "./diaryService";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<Diary[]>([]);
  const [diaryEntriesComplete, setDiaryEntriesComplete] = useState<
    DiaryComplete[]
  >([]);
  const [loadError, setLoadError] = useState("");

  const refreshDiaryEntries = useCallback(() => {
    return Promise.all([
      diaryService.getAll(),
      diaryService.getAllComplete(),
    ])
      .then(([entries, completeEntries]) => {
        const latestFirst = (a: Diary, b: Diary) =>
          new Date(b.date).getTime() - new Date(a.date).getTime();

        setDiaryEntries([...entries].sort(latestFirst));
        setDiaryEntriesComplete([...completeEntries].sort(latestFirst));
        setLoadError("");
      })
      .catch((error: unknown) => {
        const message =
          error instanceof Error ? error.message : "An unknown error occurred";
        setLoadError(`Could not refresh diary entries: ${message}`);
      });
  }, []);

  useEffect(() => {
    void refreshDiaryEntries();
  }, [refreshDiaryEntries]);

  return (
    <div>
      <DiaryForm onEntryAdded={refreshDiaryEntries} />
      {loadError && <p role="alert">{loadError}</p>}
      <DiaryView diary={diaryEntries} diaryComplete={diaryEntriesComplete} />
    </div>
  );
}

export default App;
