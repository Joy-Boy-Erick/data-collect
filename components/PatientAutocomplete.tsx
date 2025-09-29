
import React, { useState, useEffect, useCallback } from 'react';
import type { Patient } from '../types';
import { getPatients } from '../services/api';

interface PatientAutocompleteProps {
  onPatientSelect: (patient: Patient) => void;
  reset: boolean;
}

const PatientAutocomplete: React.FC<PatientAutocompleteProps> = ({ onPatientSelect, reset }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Patient[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedPatientName, setSelectedPatientName] = useState('');

  useEffect(() => {
    if (reset) {
        setQuery('');
        setSelectedPatientName('');
        setSuggestions([]);
        setShowSuggestions(false);
    }
  }, [reset]);

  const fetchSuggestions = useCallback(async (searchQuery: string) => {
    if (searchQuery.length > 0) {
      const patients = await getPatients(searchQuery);
      setSuggestions(patients);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, []);

  useEffect(() => {
    if (query === selectedPatientName) return;

    const handler = setTimeout(() => {
      fetchSuggestions(query);
    }, 300); // Debounce API calls

    return () => {
      clearTimeout(handler);
    };
  }, [query, fetchSuggestions, selectedPatientName]);

  const handleSelect = (patient: Patient) => {
    setQuery(patient.name);
    setSelectedPatientName(patient.name);
    onPatientSelect(patient);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query.length > 0 && setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        placeholder="Search for a patient..."
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((patient) => (
            <li
              key={patient.id}
              onClick={() => handleSelect(patient)}
              className="px-4 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900"
            >
              {patient.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientAutocomplete;
