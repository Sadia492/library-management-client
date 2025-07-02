import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import Swal from "sweetalert2";
import { Label } from "@/components/ui/label";
import { FaPen } from "react-icons/fa";
import { useState } from "react";
import type { IBook } from "@/types";
import { useUpdateBookMutation } from "@/redux/features/books/booksApi";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditBookProps {
  book: IBook;
}

export function EditBook({ book }: EditBookProps) {
  const [formData, setFormData] = useState({
    title: book.title,
    author: book.author,
    genre: book.genre,
    isbn: book.isbn,
    description: book.description,
    copies: book.copies.toString(),
  });
  const [updateBook] = useUpdateBookMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await updateBook({ id: book._id, bookData: formData }).unwrap();
    if (res?.success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Book Updated Successfully`,
        showConfirmButton: false,
        timer: 1500,
      });
    }

    // You can send a mutation request here
    console.log("Update data:", { ...formData, _id: book._id });

    // TODO: call your updateBookMutation()
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gray-700 text-white px-4 py-2 mr-1 rounded-lg shadow-md hover:shadow-xl transition-transform">
          <FaPen />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 mt-3">
            {/* Two Inputs in One Line */}
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
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
