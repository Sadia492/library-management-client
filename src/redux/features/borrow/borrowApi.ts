import type { GetBorrowsResponse } from "@/types";
import { apiSlice } from "../api/apiSlice";

export const borrowApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBorrows: builder.query<GetBorrowsResponse, void>({
      query: () => "/borrow",
      providesTags: ["Borrow"],
    }),
    borrowBook: builder.mutation({
      query: (borrow) => ({
        url: "/borrow",
        method: "POST",
        body: borrow,
      }),
      invalidatesTags: ["Borrow", "Book"],
    }),
  }),
});

export const { useGetBorrowsQuery, useBorrowBookMutation } = borrowApi;
