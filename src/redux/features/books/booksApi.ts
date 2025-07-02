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
      providesTags: ["Book"],
    }),
    getBook: builder.query<IBook, void>({
      query: (id) => `/books/${id}`,
      providesTags: ["Book"],
    }),
    addBook: builder.mutation({
      query: (book) => ({
        url: "/books",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["Book"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),
    updateBook: builder.mutation({
      query: ({ id, bookData }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: bookData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useAddBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
} = booksApi;
