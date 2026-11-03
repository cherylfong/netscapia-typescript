import { useState, useEffect } from "react";
import { type Note } from "./types";
import noteService from "./noteService";

function App() {
  const [noteValue, setNoteValue] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  const noteAddition = (event: React.SyntheticEvent) => {
    event.preventDefault();

    // const noteToAdd = {
    //   content: noteValue,
    //   id: String(notes.length + 1)
    // }
    // setNotes(notes.concat(noteToAdd));

    noteService.add({ content: noteValue }).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
    });
    setNoteValue("");
  };

  return (
    <div>
      <form onSubmit={noteAddition}>
        <input
          value={noteValue}
          onChange={(event) => setNoteValue(event.target.value)}
        />
        <button type="submit">add</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
