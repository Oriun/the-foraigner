import { API_BASE } from "./Constantes";
import { APIError } from "./Utils";

export const getExercise = async (id: string) => {
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
