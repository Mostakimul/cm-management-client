import { baseApi } from '../../api/baseApi';

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAdmin: builder.mutation({
      query: (userInfo) => ({
        url: '/users/create-admin',
        method: 'POST',
        body: userInfo,
      }),
    }),
    createBuyer: builder.mutation({
      query: (userInfo) => ({
        url: '/users/create-buyer',
        method: 'POST',
        body: userInfo,
      }),
    }),
    createSeller: builder.mutation({
      query: (userInfo) => ({
        url: '/users/create-seller',
        method: 'POST',
        body: userInfo,
      }),
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useCreateBuyerMutation,
  useCreateSellerMutation,
} = userApi;
