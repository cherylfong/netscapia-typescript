export interface Note {
  id: string,
  content: string
}

export type NoteEntry = Omit<Note, 'id'>;