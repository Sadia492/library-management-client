import { useGetBooksQuery } from "@/redux/features/books/booksApi";
import type { IBook } from "@/types";
import { FaTrashAlt } from "react-icons/fa";
import { EditBook } from "../comps/EditBook";

export default function AllBooks() {
  const { data, isLoading } = useGetBooksQuery();

  const books = data?.data || []; // ← safely get the IBook[] from response

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
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
                    <div className="flex">
                      <EditBook book={book} />
                      <button
                        // onClick={() => setSelectedSubmission(book)}
                        className="bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-transform"
                      >
                        <FaTrashAlt></FaTrashAlt>
                      </button>
                    </div>
                    <div>
                      <button
                        // onClick={() => setSelectedSubmission(book)}
                        className="bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-transform mt-1"
                      >
                        Borrow
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-2xl font-bold text-primary">
                  No Pending Assignment Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
