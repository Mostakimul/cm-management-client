import { baseApi } from '../../api/baseApi';

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addServicing: builder.mutation({
      query: (servicingInfo) => ({
        url: '/servicing',
        method: 'POST',
        body: servicingInfo,
      }),
      invalidatesTags: ['service'],
    }),
  }),
});

export const { useAddServicingMutation } = serviceApi;
