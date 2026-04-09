import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
const API_URL = import.meta.env.VITE_API_URL;

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const BASE_URL = "http://localhost:8000";

export const USER_API_END_POINT = `${API_URL}/user`;
export const JOB_API_END_POINT = `${API_URL}/jobs`;
export const APPLICATION_API_END_POINT = `${API_URL}/application`;
export const COMPANY_API_END_POINT = `${API_URL}/company`;
