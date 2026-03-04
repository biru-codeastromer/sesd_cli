import axios, { AxiosError } from 'axios';

export class ErrorHandler {
  static getMessage(error: unknown, fallback: string): string {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        return `${fallback}: resource not found.`;
      }
      return `${fallback}: ${axiosError.message}`;
    }
    return error instanceof Error ? error.message : fallback;
  }
}
