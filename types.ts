
export interface User {
  id: number;
  name: string;
  username: string;
}

export interface Patient {
  id: number;
  name: string;
}

export interface Payment {
  id: number;
  patient_id: number;
  patient_name: string;
  amount: number;
  paid_at: string; // ISO string format: YYYY-MM-DD
  created_by: number;
  created_at: string;
}
