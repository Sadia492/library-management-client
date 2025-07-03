import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaEye } from "react-icons/fa";
import type { IBookInput } from "@/types";

interface BookDetailsProps {
  book: IBookInput;
}

export function BookDetails({ book }: BookDetailsProps) {
  const { title, author, genre, isbn, description, copies, available } = book;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-transform mt-1">
          <FaEye />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Book Details</DialogTitle>
          <DialogDescription>
            View information about <strong>{title}</strong>.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 mt-4 text-sm">
          <div>
            <strong>Title:</strong> {title}
          </div>
          <div>
            <strong>Author:</strong> {author}
          </div>
          <div>
            <strong>Genre:</strong> {genre || "N/A"}
          </div>
          <div>
            <strong>ISBN:</strong> {isbn}
          </div>
          <div>
            <strong>Description:</strong> {description}
          </div>
          <div>
            <strong>Copies:</strong> {copies}
          </div>
          <div>
            <strong>Availability:</strong>{" "}
            {available ? "Available" : "Unavailable"}
          </div>
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
