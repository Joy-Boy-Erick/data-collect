
import React, { useState } from 'react';

interface DateRangeFilterProps {
  onFilter: (startDate: string, endDate: string) => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ onFilter }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilter = () => {
    onFilter(startDate, endDate);
  };
  
  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    onFilter('', '');
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6 flex flex-wrap items-center gap-4">
      <div className="flex-1 min-w-[150px]">
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
      <div className="flex-1 min-w-[150px]">
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          End Date
        </label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
      <div className="flex items-end space-x-2 pt-5">
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Filter
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default DateRangeFilter;
