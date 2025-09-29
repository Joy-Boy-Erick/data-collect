import React, { useState } from 'react';
import { addPatient } from '../services/api';
import Spinner from './Spinner';

interface AddPatientFormProps {
  onPatientAdded: () => void;
}

const AddPatientForm: React.FC<AddPatientFormProps> = ({ onPatientAdded }) => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Patient name is required.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await addPatient(name);
      setSuccess(`Patient "${name}" added successfully!`);
      setName('');
      onPatientAdded();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Add New Patient</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Patient Name
          </label>
          <input
            type="text"
            id="patientName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
            placeholder="e.g., John Doe"
            disabled={isLoading}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
          >
            {isLoading ? <Spinner /> : 'Add Patient'}
          </button>
        </div>
        {error && <div className="mt-3 text-center p-2 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 rounded-md text-sm">{error}</div>}
        {success && <div className="mt-3 text-center p-2 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-md text-sm">{success}</div>}
      </form>
    </div>
  );
};

export default AddPatientForm;