export class APIError extends Error {
  constructor(message: string, public status: number, public body: any) {
    super(message);
  }
}