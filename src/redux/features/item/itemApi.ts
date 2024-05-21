import { baseApi } from '../../api/baseApi';

const itemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (productInfo) => ({
        url: '/products',
        method: 'POST',
        body: productInfo,
      }),
      invalidatesTags: ['products', 'myProducts'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        'products',
        'myProducts',
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
    getMyItems: builder.query({
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
          url: '/products/my-products',
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['myProducts'],
    }),
    deleteItem: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['products', 'myProducts'],
    }),
    bulkDeleteItem: builder.mutation({
      query: (productIds) => {
        return {
          url: `/products/bulk-delete`,
          method: 'POST',
          body: {
            productIds,
          },
        };
      },
      invalidatesTags: ['products', 'myProducts'],
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
  useGetMyItemsQuery,
} = itemApi;
