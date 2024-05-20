import { baseApi } from '../../api/baseApi';

const itemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sellProduct: builder.mutation({
      query: (productInfo) => ({
        url: '/sales',
        method: 'POST',
        body: productInfo,
      }),
      invalidatesTags: ['sales', 'products'],
    }),
    getAllSales: builder.query({
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
          url: '/sales',
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['sales'],
    }),
    getSingleSale: builder.query({
      query: (id) => ({
        url: `/sales/${id}`,
        method: 'GET',
      }),
      providesTags: ['sale'],
    }),
  }),
});

export const {
  useSellProductMutation,
  useGetAllSalesQuery,
  useGetSingleSaleQuery,
} = itemApi;
