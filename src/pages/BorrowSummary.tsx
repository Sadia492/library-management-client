import { useGetBorrowsQuery } from "@/redux/features/borrow/borrowApi";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";

export default function BorrowSummary() {
  const { data, isLoading, isError } = useGetBorrowsQuery();

  const summary = data?.data || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin w-6 h-6 text-gray-600" />
        <span className="ml-2 text-gray-600">Loading borrow summary...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-10">
        ❌ Failed to load borrow summary.
      </div>
    );
  }

  return (
    <Card className="max-w-5xl mx-auto mt-10 p-4 shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl text-gray-800">
          📚 Borrow Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        {summary.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No borrow records found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left">#</TableHead>
                  <TableHead className="text-left">Book Title</TableHead>
                  <TableHead className="text-left">ISBN</TableHead>
                  <TableHead className="text-left">
                    Total Quantity Borrowed
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {summary.map((borrow, index) => (
                  <TableRow key={borrow.book?.isbn || index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{borrow.book?.title}</TableCell>
                    <TableCell>{borrow.book?.isbn}</TableCell>
                    <TableCell>{borrow.totalQuantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
