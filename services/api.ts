import type { User, Patient, Payment } from '../types';

const API_BASE_URL = '/api'; // Assuming the API is served from the same domain

/**
 * A helper function to handle API responses, parse JSON, and throw errors.
 * @param response - The fetch Response object.
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      errorData = { message: response.statusText || 'An unknown error occurred.' };
    }
    throw new Error(errorData?.message || 'An API error occurred.');
  }
  // Handle responses with no content (e.g., successful logout)
  if (response.status === 204) {
    return null as T;
  }
  return response.json() as Promise<T>;
}

// NOTE: For a real app using session-based auth, CSRF protection is crucial.
// This implementation assumes API routes are exempt or CSRF is handled elsewhere
// (e.g., by a library like Axios or custom fetch wrappers).

/**
 * Authenticates the admin user.
 * @returns The user object on success.
 */
export async function login(username: string, password: string): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  // Assuming the backend returns the user object upon successful login
  return handleResponse<User>(response);
}

/**
 * Logs the admin user out by invalidating the server session.
 */
export async function logout(): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
    });
    await handleResponse(response);
}

/**
 * Fetches a list of patients, optionally filtering by a search query.
 * @param query - The search string to filter patients by name.
 */
export async function getPatients(query: string = ''): Promise<Patient[]> {
  const response = await fetch(`${API_BASE_URL}/patients?search=${encodeURIComponent(query)}`);
  return handleResponse<Patient[]>(response);
}

/**
 * Creates a new patient.
 * @param name - The name of the new patient.
 */
export async function addPatient(name: string): Promise<Patient> {
    const response = await fetch(`${API_BASE_URL}/patients`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ name }),
    });
    return handleResponse<Patient>(response);
}

interface GetPaymentsParams {
  startDate?: string;
  endDate?: string;
}

/**
 * Fetches a list of payments, optionally filtering by a date range.
 */
export async function getPayments({ startDate, endDate }: GetPaymentsParams): Promise<Payment[]> {
    const params = new URLSearchParams();
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);

    const response = await fetch(`${API_BASE_URL}/payments?${params.toString()}`);
    return handleResponse<Payment[]>(response);
}

interface AddPaymentData {
  patient_id: number;
  amount: number;
  paid_at: string; // YYYY-MM-DD
}

/**
 * Creates a new payment record.
 * @param data - The payment details.
 */
export async function addPayment(data: AddPaymentData): Promise<Payment> {
    const response = await fetch(`${API_BASE_URL}/payments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return handleResponse<Payment>(response);
}
