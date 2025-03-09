import React, { useEffect, useState } from 'react';
import { config } from '../config';
import TransactionList from '../components/TransactionList';
import TransactionListHeader from '../components/TransactionListHeader';

interface Transaction {
  id: string;
  amount: string | number;
  type: "credit" | "debit";
  timestamp: string;
}

const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${config.apiBaseUrl}/transactions`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }

      const data = await response.json();
      setTransactions(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred while fetching transactions'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <TransactionListHeader
        onRefresh={fetchTransactions}
        isLoading={isLoading}
      />
      <TransactionList
        transactions={transactions}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default TransactionsPage; 