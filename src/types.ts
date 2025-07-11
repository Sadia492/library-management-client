// For creating a book

export interface IBookInput {
  title: string;
  author: string;
  genre:
    | ""
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description: string;
  copies: number;
  available?: boolean;
}

// For reading from MongoDB
export interface IBook extends IBookInput {
  _id: string;
}

// export type SubmitHandler<T> = (e: React.FormEvent<HTMLFormElement>) => void;

export interface IBorrowSummary {
  _id: string;
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
}

export interface GetBorrowsResponse {
  success: boolean;
  message: string;
  data: IBorrowSummary[];
}
