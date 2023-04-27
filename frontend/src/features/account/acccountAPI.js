import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/",
  }),
  endpoints: (builder) => ({
    getAccount: builder.query({
      query: (name, password) => `login/username=${name}&password=${password}`,
    }),
  }),
});

export const { useGetAccount } = accountApi;
