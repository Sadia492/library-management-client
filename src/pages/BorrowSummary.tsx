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
import LoadingSpinner from "@/comps/LoadingSpinner";

export default function BorrowSummary() {
  const { data, isLoading, isError } = useGetBorrowsQuery();

  const summary = data?.data || [];

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-24">
        ❌ Failed to load borrow summary.
      </div>
    );
  }

  return (
    <Card className="w-11/12 mx-auto p-4 shadow-md rounded-2xl mt-24">
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
                {summary?.length > 0 ? (
                  summary.map((borrow, index) => (
                    <TableRow key={borrow.book?.isbn || index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{borrow.book?.title}</TableCell>
                      <TableCell>{borrow.book?.isbn}</TableCell>
                      <TableCell>{borrow.totalQuantity}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center text-gray-500 font-medium"
                    >
                      No books has been borrowed
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
