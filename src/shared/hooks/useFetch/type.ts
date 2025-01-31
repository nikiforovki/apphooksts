export type ApiResponse<T> = {
  isLoading: boolean;
  response: T | null;
  error: string | null;
};

export type DoFetch = (options?: RequestInit) => void;
