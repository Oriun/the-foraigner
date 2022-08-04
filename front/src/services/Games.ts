import { API_BASE } from "./Constantes";
import { APIError, Coordinates, Size } from "./Utils";

export const getExercise = async <S extends Exercise>(id: string) : Promise<S>=> {
  const response = await fetch(`${API_BASE}/api/exercise/${id}`, {
    credentials: "include"
  });
  if (!response.ok) {
    throw new APIError(
      response.statusText,
      response.status,
      await response.json()
    );
  }
  const data = await response.json();
  return data;
};

export type Exercise<T = any> = {
  _id: string;
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
    horizontal: false;
  }[];
}>;
