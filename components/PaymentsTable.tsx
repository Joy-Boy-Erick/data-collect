
import React from 'react';
import type { Payment } from '../types';

interface PaymentsTableProps {
  payments: Payment[];
}

const PaymentsTable: React.FC<PaymentsTableProps> = ({ payments }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Patient Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Amount
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {payments.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                No payments found.
              </td>
            </tr>
          ) : (
            payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-600/20">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  {formatDate(payment.paid_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  {payment.patient_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                  {formatCurrency(payment.amount)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsTable;
