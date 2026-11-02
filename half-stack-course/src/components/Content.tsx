import { type ContentProp } from "../types";
import { Part } from "./Part";

export const Content = ({ courseParts }: ContentProp) => {
  return <Part courseParts={courseParts} />;
};
