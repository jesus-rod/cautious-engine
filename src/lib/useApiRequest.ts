import { useState } from 'react';

interface RequestState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

type ApiResponse<T> = {
  ok: boolean;
  data?: T;
  status: number;
};

export function useApiRequest<T>() {
  const [state, setState] = useState<RequestState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const execute = async (apiCall: () => Promise<ApiResponse<T>>, onSuccess?: (data: T) => void, onError?: (error: Error) => void) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await apiCall();
      if (response.ok) {
        setState({
          data: response.data || null,
          isLoading: false,
          error: null,
        });
        onSuccess && onSuccess(response.data as T);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setState({
        data: null,
        isLoading: false,
        error: new Error(errorMessage),
      });
      onError && onError(new Error(errorMessage));
    }
  };

  return { ...state, execute };
}
