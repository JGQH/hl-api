import type { VercelRequest, VercelResponse } from '@vercel/node'

export type ApiEndpoint = (req:ApiRequest, res:ApiResponse) => void | Promise<void>

export type ApiMethod = 'GET'|'OPTIONS'|'PATCH'|'DELETE'|'POST'|'PUT'

export interface ApiRequest<T = {}> extends Omit<VercelRequest, 'query'|'method'> {
  query: T
  method: ApiMethod
}

export interface ApiResponse<T = any> extends Omit<VercelResponse, 'json'|'status'> {
  json: (jsonBody: T | { error: string }) => ApiResponse<T>
  status: (statusCode: number) => ApiResponse<T>
}