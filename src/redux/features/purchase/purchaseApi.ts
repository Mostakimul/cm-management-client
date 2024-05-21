import { baseApi } from '../../api/baseApi';

const purchaseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    purchaseProduct: builder.mutation({
      query: (productInfo) => ({
        url: '/purchase',
        method: 'POST',
        body: productInfo,
      }),
      invalidatesTags: ['sales', 'products'],
    }),
  }),
});

export const { usePurchaseProductMutation } = purchaseApi;
