
import React, { useState, useEffect, useCallback } from 'react';
import PaymentsTable from '../components/PaymentsTable';
import { getPayments } from '../services/api';
import type { Payment } from '../types';
import Spinner from '../components/Spinner';

const PublicPaymentsPage: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPublicPayments = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getPayments({}); // Fetch all payments
      setPayments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch payments.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPublicPayments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Public Payments Record</h1>
      <p className="text-center text-gray-600 dark:text-gray-400">A read-only list of all recorded payments.</p>
      
      <div className="max-w-4xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        ) : error ? (
          <p className="text-center text-red-500 bg-red-100 dark:bg-red-900/50 p-4 rounded-md">{error}</p>
        ) : (
          <PaymentsTable payments={payments} />
        )}
      </div>
    </div>
  );
};

export default PublicPaymentsPage;
