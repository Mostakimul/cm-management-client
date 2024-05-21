import { baseApi } from '../../api/baseApi';

const purchaseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    purchaseProduct: builder.mutation({
      query: (productInfo) => ({
        url: '/purchase',
        method: 'POST',
        body: productInfo,
      }),
      invalidatesTags: ['sales', 'products', 'purchases'],
    }),
    getAllPurchase: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          Object.entries(args).forEach(([key, value]) => {
            if (typeof value === 'string' || typeof value === 'number') {
              params.append(key, value.toString());
            }
          });
        }

        return {
          url: '/purchase',
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['purchases'],
    }),
  }),
});

export const { usePurchaseProductMutation, useGetAllPurchaseQuery } =
  purchaseApi;
