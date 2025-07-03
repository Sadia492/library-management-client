import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import type { IBook, IBookInput } from "@/types";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddBookMutation } from "@/redux/features/books/booksApi";
import Swal from "sweetalert2";

export default function AddBook() {
  const [formData, setFormData] = useState<IBookInput>({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
  });
  const [addBook, { isLoading }] = useAddBookMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "copies" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await addBook(formData).unwrap();

      if (res.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Book Added successfully`,
          showConfirmButton: false,
          timer: 1500,
        });

        setFormData({
          title: "",
          author: "",
          genre: "",
          isbn: "",
          description: "",
          copies: 1,
        });
      }
    } catch (error: any) {
      console.error("❌ Error:", error);

      // ✅ Case 1: Mongoose validation or duplicate key error
      if (
        error?.data?.error?.name === "ValidationError" &&
        error?.data?.error?.errors
      ) {
        const fieldErrors = error.data.error.errors;

        // ✅ Collect error messages
        const messages = Object.entries(fieldErrors).map(
          ([field, info]: any) => {
            return `${field.toUpperCase()}: ${info.message}`;
          }
        );

        Swal.fire({
          icon: "error",
          title: "Validation Failed",
          html: `<ul class="text-left">${messages
            .map((m) => `<li>• ${m}</li>`)
            .join("")}</ul>`,
        });
      }

      // ✅ Case 2: Unknown error
      else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: error?.data?.message || "Please try again later.",
        });
      }
    }
  };

  return (
    <div className="mt-24 w-11/12 mx-auto">
      <h2 className="text-3xl font-bold text-center mb-5">Add New Book</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="genre">Genre</Label>

            <Select
              value={formData.genre}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  genre: value as IBook["genre"],
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select Genre</SelectLabel>
                  {/* <SelectItem value="">Select Genre</SelectItem> */}
                  <SelectItem value="FICTION">FICTION</SelectItem>
                  <SelectItem value="NON_FICTION">NON_FICTION</SelectItem>
                  <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                  <SelectItem value="HISTORY">HISTORY</SelectItem>
                  <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                  <SelectItem value="FANTASY">FANTASY</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="isbn">ISBN</Label>
            <Input
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="copies">Copies</Label>
            <Input
              id="copies"
              name="copies"
              type="number"
              value={formData.copies}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-transform mt-1"
          >
            {isLoading ? "Adding" : "Add Book"}
          </button>
        </div>
      </form>
    </div>
  );
}
