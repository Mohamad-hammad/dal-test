import React from "react";
import { RefreshIcon } from "@heroicons/react/outline";

interface TransactionListHeaderProps {
  onRefresh: () => void;
  isLoading: boolean;
}

const TransactionListHeader: React.FC<TransactionListHeaderProps> = ({
  onRefresh,
  isLoading,
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Transactions</h2>
      </div>
      <button
        onClick={onRefresh}
        disabled={isLoading}
        className={`flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg transition-colors ${
          isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
        }`}
      >
        <RefreshIcon className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
        {isLoading ? 'Refreshing...' : 'Refresh'}
      </button>
    </div>
  );
};

export default TransactionListHeader; 