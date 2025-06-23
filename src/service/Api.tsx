import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseUrl} from "./URLs";

export const UniformService = createApi({
  reducerPath: "Library",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      const access_token = localStorage.getItem("token");
      if (access_token) {
        headers.set("Authorization", `Bearer ${access_token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    ApiRequest: builder.query({
      query: ({method, url, body, params}) => {
        return { method, url, body, params,};
      },
      //dont cache this query
      keepUnusedDataFor: 0,
      forceRefetch: () => true,
    }),
    ApiMutate: builder.mutation({
      query: ({method, url, body, params}) => {
        return { method, url, body, params,};
      },
    }),
  }),
});

export const {useApiRequestQuery, useApiMutateMutation} = UniformService;
