export class APIError extends Error {
  constructor(message: string, public status: number, public body: any) {
    super(message);
  }
}

export type Coordinates = {
  x: number;
  y: number;
};
export type Size = Coordinates

export function matrix(
  { x, y }: Size,
  value: any | ((x: number, y: number) => any)
) {
  return Array.from({ length: y }, (_, i) =>
    Array.from({ length: x }, (_, j) =>
      typeof value === "function" ? value(i, j) : value
    )
  );
}