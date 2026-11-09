export const Weather = {
  Sunny: "sunny",
  Rainy: "rainy",
  Cloudy: "cloudy",
  Stormy: "stormy",
  Windy: "windy",
} as const;

export type Weather = (typeof Weather)[keyof typeof Weather];

export const isWeather = (param: string): param is Weather => {
  return (Object.values(Weather) as string[]).includes(param);
};

export const Visibility = {
  Great: "great",
  Good: "good",
  Ok: "ok",
  Poor: "poor",
} as const;

export type Visibility = (typeof Visibility)[keyof typeof Visibility];

export const isVisibility = (param: string): param is Visibility => {
  return (Object.values(Visibility) as string[]).includes(param);
};

// branded string
declare const isoDateBrand: unique symbol;
export type IsoDate = string & {
  readonly [isoDateBrand]: true;
};

// type checking for isIsoDate
export function isIsoDate(value: string): value is IsoDate {
  // checks YYYY-MM-DD format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const date = new Date(value);

  // checks calendar validity, rejecting values such as "2026-02-30"
  return (
    !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
  );
}

export interface Diary {
  id: string;
  date: IsoDate;
  weather: Weather;
  visibility: Visibility;
}

export interface DiaryComplete extends Diary {
  comment: string;
}

export type DiaryEntry = Omit<DiaryComplete, "id">;

// for DiaryView Component
export interface DiaryProp {
  diary: Diary[];
}
export interface DiaryCompleteProp {
  diaryComplete: DiaryComplete[];
}
