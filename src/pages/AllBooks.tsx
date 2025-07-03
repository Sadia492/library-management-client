import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from "@/redux/features/books/booksApi";
import type { IBook } from "@/types";
import { FaTrashAlt } from "react-icons/fa";
import { EditBook } from "../comps/EditBook";
import { BorrowBook } from "@/comps/BorrowBook";
import Swal from "sweetalert2";
import LoadingSpinner from "@/comps/LoadingSpinner";
import toast from "react-hot-toast";

export default function AllBooks() {
  const { data, isLoading, isError } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();

  const books = data?.data || [];

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBook(id)
          .unwrap()
          .then((res) => {
            if (res?.success) {
              Swal.fire({
                title: "Deleted!",
                text: res?.message,
                icon: "success",
              });
            } else {
              toast.error(res?.message);
            }
          })
          .catch((error) => {
            toast.error(error?.message);
          });
      }
    });
  };
  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold text-red-600">
          Failed to fetch books.
        </h2>
        <p className="text-gray-500 mt-2">
          Please check your internet connection or try again later.
        </p>
      </div>
    );

  return (
    <div className="w-11/12 mx-auto">
      <div className="overflow-x-scroll" style={{ overflowX: "scroll" }}>
        <table className="table text-center border-separate border-spacing-y-3 border-white w-full">
          <thead
            className="bg-gray-700"
            style={{
              // backgroundImage: `url(${bgImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <tr className="text-white rounded-lg">
              <th className="py-3 px-6">#</th>
              <th className="py-3 px-6">Title</th>
              <th className="py-3 px-6">Author</th>
              <th className="py-3 px-6">Genre</th>
              <th className="py-3 px-6">ISBN</th>
              <th className="py-3 px-6">Description</th>
              <th className="py-3 px-6">Copies</th>
              <th className="py-3 px-6">Available</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {books?.length ? (
              books?.map((book: IBook, idx: number) => (
                <tr
                  key={book._id}
                  className="bg-white shadow-lg rounded-lg hover:scale-105 transform transition duration-300 ease-in-out"
                >
                  <th className="py-3 px-6 text-primary">{idx + 1}</th>
                  <td className="py-3 px-6 text-gray-700 font-medium">
                    {book?.title}
                  </td>
                  <td className="py-3 px-6 text-gray-600">{book?.author}</td>
                  <td className="py-3 px-6 text-gray-700">{book?.genre}</td>
                  <td className="py-3 px-6 text-gray-700">{book?.isbn}</td>
                  <td className="py-3 px-6 text-gray-700">
                    {book?.description}
                  </td>
                  <td className="py-3 px-6 text-gray-700">{book?.copies}</td>
                  <td className="py-3 px-6 text-gray-700">
                    {book?.available ? "Available" : "Not Available"}
                  </td>
                  <td className="py-3 px-6">
                    <div className="flex gap-2">
                      <EditBook book={book} />
                      <button
                        onClick={() => handleDelete(book._id)}
                        className="bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-transform"
                      >
                        <FaTrashAlt></FaTrashAlt>
                      </button>
                    </div>
                    <div>
                      <BorrowBook
                        bookId={book._id}
                        availableCopies={book.copies}
                        title={book.title}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-2xl font-bold text-primary">
                  No Books Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
