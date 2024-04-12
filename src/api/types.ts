export type FetchMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export enum UserRole {
  PROGRAMMGER = 'PROGRAMMGER',
  TEAM_LEAD = 'TEAM_LEAD',
  VIEWER = 'VIEWER',
  ADMIN = 'ADMIN',
}

export enum AuthError {
  EMAIL_EXISTS = 'EMAIL_EXISTS',
  INVALID_EMAIL = 'INVALID_EMAIL',
  OPERATION_NOT_ALLOWED = 'OPERATION_NOT_ALLOWED',
  INVALID_LOGIN_CREDENTIALS = 'INVALID_LOGIN_CREDENTIALS',
  TOO_MANY_ATTEMPTS_TRY_LATER = 'TOO_MANY_ATTEMPTS_TRY_LATER',
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  displayName: string;
}

export type FirebaseError = {
  code: number;
  errors: Error[];
  message: string;
};

export interface RequestParams {
  path?: string;
  baseURL?: string;
  params?: Record<string, unknown>;
  token?: string;
  method?: FetchMethod;
  body?: Record<string, unknown> | null;
}

export interface User {
  uid: string;
  email: string;
  role: UserRole;
  displayName: string;
}

export interface DocRequestParams {
  path: string;
  documentId: string;
  body?: Record<string, unknown>;
}
