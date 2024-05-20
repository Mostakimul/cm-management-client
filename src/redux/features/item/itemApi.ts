import { baseApi } from '../../api/baseApi';

const itemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (productInfo) => ({
        url: '/products',
        method: 'POST',
        body: productInfo,
      }),
      invalidatesTags: ['products'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        'products',
        { type: 'product', id },
      ],
    }),
    getAllItems: builder.query({
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
          url: '/products',
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['products'],
    }),
    deleteItem: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['products'],
    }),
    bulkDeleteItem: builder.mutation({
      query: (productIds) => {
        console.log(productIds);
        return {
          url: `/products/bulk-delete`,
          method: 'POST',
          body: {
            productIds,
          },
        };
      },
      invalidatesTags: ['products'],
    }),
    getSingleItem: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
      providesTags: ['product'],
    }),
    getAllFilters: builder.query({
      query: () => ({
        url: `/products/filters`,
        method: 'GET',
      }),
      providesTags: ['filter'],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetAllItemsQuery,
  useDeleteItemMutation,
  useGetSingleItemQuery,
  useUpdateProductMutation,
  useBulkDeleteItemMutation,
  useGetAllFiltersQuery,
} = itemApi;
