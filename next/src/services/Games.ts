import { API_BASE } from "./Constantes";
import { APIError, Coordinates, Size } from "./Utils";

export type Exercise<T = any> = {
  id: string;
  name: string;
  type: string;
  category: string;
  content: T;
  description: string;
  language: string;
};

export type CrosswordsData = Exercise<{
  size: Size;
  words: {
    content: string;
    description: string;
    start: Coordinates;
    horizontal: boolean;
  }[];
}>;

export type FillInTheGapsData = Exercise<string[][]>;

export type FlashcardsData = Exercise<
  {
    image: string;
    options: string[];
    answer: number;
  }[]
>;
