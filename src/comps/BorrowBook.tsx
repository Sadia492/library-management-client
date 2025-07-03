import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router";
import { useBorrowBookMutation } from "@/redux/features/borrow/borrowApi";
import toast from "react-hot-toast";

interface BorrowBookProps {
  bookId: string;
  availableCopies: number;
  title: string;
}

export function BorrowBook({
  bookId,
  availableCopies,
  title,
}: BorrowBookProps) {
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");
  const [borrowBook, { isLoading }] = useBorrowBookMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (availableCopies < 1) {
      toast.error("❌ No copies available for borrowing.");
      return;
    }

    if (quantity < 1) {
      toast.error("❌ Quantity must be at least 1.");
      return;
    }

    if (quantity > availableCopies) {
      toast.error(`❌ Only ${availableCopies} copies are available.`);
      return;
    }
    const selectedDate = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // remove time part for accurate date-only comparison

    if (!dueDate || selectedDate < today) {
      toast.error("❌ Please select a valid due date (today or later).");
      return;
    }

    try {
      const response = await borrowBook({
        book: bookId,
        quantity,
        dueDate,
      }).unwrap();

      if (response?.success) {
        toast.success(response?.message);
        navigate("/borrow-summary");
      }
    } catch (error: any) {
      toast.error(error?.message || "❌ Failed to borrow book.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-transform mt-1">
          Borrow
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Borrow Book</DialogTitle>
            <DialogDescription>
              Borrow <strong>{title}</strong> – fill in the quantity and due
              date.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 mt-4">
            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity (max {availableCopies})</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                // min={1}
                // max={availableCopies}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                name="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Borrowing..." : "Confirm Borrow"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
