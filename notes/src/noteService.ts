import axios from 'axios'
import type { Note, NoteEntry } from './types'

const baseUrl = 'http://localhost:3000/notes'

const getAll = () => {
  return axios.get<Note[]>(baseUrl)
    .then(response => response.data)
}

const add = (object: NoteEntry) => {
  return axios.post<Note>(baseUrl, object)
    .then(response => response.data)
}

export default { getAll, add }