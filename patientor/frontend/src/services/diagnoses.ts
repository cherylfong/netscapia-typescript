import axios, { AxiosError } from "axios";
import { Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);

  return data;
};

const getByCode = async (code: string | undefined): Promise<Diagnosis> => {
  if (code === undefined) {
    throw new AxiosError("Diagnosis code is undefined");
  }

  const { data } = await axios.get<Diagnosis>(
    `${apiBaseUrl}/diagnoses?code=${code}`,
  );

  return data;
};

export default {
  getAll,
  getByCode,
};
