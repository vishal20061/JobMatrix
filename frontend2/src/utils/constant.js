import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const BASE_URL = "http://localhost:8000";

export const USER_API_END_POINT = `${BASE_URL}/user`;
export const JOB_API_END_POINT = `${BASE_URL}/jobs`;
export const APPLICATION_API_END_POINT = `${BASE_URL}/application`;
export const COMPANY_API_END_POINT = `${BASE_URL}/company`;
