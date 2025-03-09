import React, { useEffect, useState } from "react";
import { config } from "../config";
import TransactionList from "../components/TransactionList";
import TransactionListHeader from "../components/TransactionListHeader";

interface Transaction {
  id: string;
  amount: string | number;
  type: "credit" | "debit";
  timestamp: string;
}

interface PaginationInfo {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 0,
  });

  const fetchTransactions = async (page: number = 1) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        `${config.apiBaseUrl}/transactions?page=${page}&pageSize=${pagination.pageSize}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const data = await response.json();
      setTransactions(data.transactions);
      setPagination(data.pagination);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching transactions"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchTransactions(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex-1"></div>
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Transactions
              </h1>
              <p className="text-gray-500">
                View and manage your transaction history
              </p>
            </div>
            <div className="flex-1 flex justify-end">
              <TransactionListHeader
                onRefresh={() => fetchTransactions(pagination.page)}
                isLoading={isLoading}
              />
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-4 text-gray-500">Loading transactions...</p>
            </div>
          ) : (
            <>
              <TransactionList
                transactions={transactions}
                isLoading={isLoading}
                error={error}
              />

              {!error && pagination.totalPages > 1 && (
                <div className="mt-8 flex flex-col items-center gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      Previous
                    </button>
                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">
                        Page {pagination.page} of {pagination.totalPages}
                      </span>
                    </div>
                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page === pagination.totalPages}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      Next
                    </button>
                  </div>
                  <div className="text-sm text-gray-500">
                    Showing {(pagination.page - 1) * pagination.pageSize + 1} to{" "}
                    {Math.min(
                      pagination.page * pagination.pageSize,
                      pagination.total
                    )}{" "}
                    of {pagination.total} entries
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
