import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://contact-app.mmsdev.site/api/v1",
  }),
  tagTypes: ["contact"],
  endpoints: (builder) => ({
    getContact: builder.query({
      query: (token) => ({
        url: "/contact",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["contact"],
    }),
    getDelete: builder.mutation({
      query: ({ token, id }) => ({
        url: `/contact/${id}`,
        method: "POST",
        body: id,
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["contact"],
    }),
    createContact: builder.mutation({
      query: ({ data, token }) => ({
        url: "/contact",
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
        body: data,
      }),
      invalidatesTags: ["contact"],
    }),
  }),
});

export const {
  useGetContactQuery,
  useCreateContactMutation,
  useGetDeleteMutation,
  useGetCreateContactMutation,
} = contactApi;
