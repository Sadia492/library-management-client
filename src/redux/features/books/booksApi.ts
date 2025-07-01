import type { IBook } from "@/types";
import { apiSlice } from "../api/apiSlice";

interface GetBooksResponse {
  success: boolean;
  message: string;
  data: IBook[];
}

export const booksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<GetBooksResponse, void>({
      query: () => "/books",
    }),
    getBook: builder.query<IBook, void>({
      query: (id) => `/books/${id}`,
    }),
  }),
});

export const { useGetBooksQuery, useGetBookQuery } = booksApi;
