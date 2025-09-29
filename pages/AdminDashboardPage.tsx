
import React, { useState, useEffect, useCallback } from 'react';
import AddPatientForm from '../components/AddPatientForm';
import AddPaymentForm from '../components/AddPaymentForm';
import PaymentsTable from '../components/PaymentsTable';
import DateRangeFilter from '../components/DateRangeFilter';
import { getPayments } from '../services/api';
import type { Payment } from '../types';
import Spinner from '../components/Spinner';

const AdminDashboardPage: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchPayments = useCallback(async (startDate?: string, endDate?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getPayments({ startDate, endDate });
      setPayments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch payments.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments, refreshKey]);

  const handleFilter = (startDate: string, endDate: string) => {
    fetchPayments(startDate, endDate);
  };
  
  const handleDataUpdate = () => {
    setRefreshKey(oldKey => oldKey + 1);
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-8">
          <AddPatientForm onPatientAdded={handleDataUpdate} />
          <AddPaymentForm onPaymentAdded={handleDataUpdate} />
        </div>

        <div className="md:col-span-2">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">All Payments</h2>
            <DateRangeFilter onFilter={handleFilter} />
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Spinner />
              </div>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : (
              <PaymentsTable payments={payments} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
