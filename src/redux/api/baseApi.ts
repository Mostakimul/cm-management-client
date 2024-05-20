import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { toast } from 'sonner';
import { logout, setUser } from '../features/auth/authSlice';
import { RootState } from '../store';

interface ErrorData {
  message: string;
}
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_API_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('authorization', `${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 404) {
    const errorData = result.error.data as ErrorData;
    toast.error(errorData.message);
  }
  if (result?.error?.status === 403) {
    const errorData = result.error.data as ErrorData;
    toast.error(errorData.message);
  }
  if (result?.error?.status === 401) {
    //* Send Refresh
    console.log('Sending refresh token');

    const res = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/refresh-token`,
      {
        method: 'POST',
        credentials: 'include',
      },
    );

    const data = await res.json();

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        }),
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ['products', 'product', 'sales', 'sale', 'filter'],
  endpoints: () => ({}),
});
