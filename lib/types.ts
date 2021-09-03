import { VercelResponse } from '@vercel/node';

export interface ApiResponse<T = any> extends Omit<VercelResponse, 'json'|'status'> {
  json: (jsonBody: T | { error: string }) => ApiResponse<T>
  status: (statusCode: number) => ApiResponse<T>
}