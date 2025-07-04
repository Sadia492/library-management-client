import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_WebApi_URL,
    credentials: "include",
  }),
  tagTypes: ["Book", "Borrow"],
  endpoints: () => ({}),
});
