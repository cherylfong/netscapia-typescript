import axios from "axios";
import type { Diary, DiaryComplete, DiaryEntry } from "./types";

const baseUrl = "/api/diaries";

const getAll = () => {
  return axios.get<Diary[]>(baseUrl).then((response) => response.data);
};

const getAllComplete = () => {
  return axios
    .get<DiaryComplete[]>(baseUrl + "/all")
    .then((response) => response.data);
};

const add = (object: DiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl, object)
    .then((response) => response.data);
};

export default { getAll, getAllComplete, add };
