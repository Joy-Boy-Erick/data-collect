import React, { useState } from 'react';
import type { Patient } from '../types';
import { addPayment } from '../services/api';
import PatientAutocomplete from './PatientAutocomplete';
import Spinner from './Spinner';

interface AddPaymentFormProps {
  onPaymentAdded: () => void;
}

const AddPaymentForm: React.FC<AddPaymentFormProps> = ({ onPaymentAdded }) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [amount, setAmount] = useState('');
  const [paidAt, setPaidAt] = useState(new Date().toISOString().split('T')[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [resetAutocomplete, setResetAutocomplete] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) {
      setError('Please select a patient.');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    if (!paidAt) {
      setError('Please select a payment date.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      await addPayment({
        patient_id: selectedPatient.id,
        amount: parseFloat(amount),
        paid_at: paidAt,
      });
      setSuccess('Payment added successfully!');
      // Reset form
      setSelectedPatient(null);
      setAmount('');
      setPaidAt(new Date().toISOString().split('T')[0]);
      setResetAutocomplete(prev => !prev);
      onPaymentAdded();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add payment.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Record New Payment</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Select Patient
          </label>
          <PatientAutocomplete 
            onPatientSelect={(patient) => setSelectedPatient(patient)} 
            reset={resetAutocomplete}
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.01"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
            placeholder="0.00"
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="paidAt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Payment Date
          </label>
          <input
            type="date"
            id="paidAt"
            value={paidAt}
            onChange={(e) => setPaidAt(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
            disabled={isLoading}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:bg-green-300 transition-colors"
          >
            {isLoading ? <Spinner /> : 'Save Payment'}
          </button>
        </div>
        {error && <div className="mt-3 text-center p-2 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 rounded-md text-sm">{error}</div>}
        {success && <div className="mt-3 text-center p-2 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-md text-sm">{success}</div>}
      </form>
    </div>
  );
};

export default AddPaymentForm;