// Firebase configuration
export const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
export const AUTH_DOMAIN = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
export const PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;
export const STORAGE_BUCKET = import.meta.env.VITE_FIREBASE_STOGRAGE_BUCKET;
export const MESSAGING_SENDER_ID = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
export const APP_ID = import.meta.env.VITE_FIREBASE_APP_ID;

// API URLS
export const AUTH_URL: string = import.meta.env.VITE_FIREBASE_AUTH_URL;
export const BASE_URL: string = import.meta.env.VITE_FIREBASE_BASE_URL;
export const TOKEN_URL: string = import.meta.env.VITE_FIREBASE_TOKEN_URL;

// Константы объявленны здесь а не в types.d.ts, т.к. .d.ts не будет создавать объекты enum во время выполнения
export enum TokensNames {
  refresh = 'refreshToken',
  access = 'accessToken',
}

export enum RequestStatus {
  Pending = 'pending',
  Loading = 'loading',
  Success = 'success',
  Fail = 'fail',
}

export enum UserRole {
  VIEWER = 'Пользователь без прав',
  PROGRAMMGER = 'Программист',
  TEAM_LEAD = 'Тимлид',
  ADMIN = 'Админ',
}

export enum AuthError {
  EMAIL_EXISTS = 'EMAIL_EXISTS',
  INVALID_EMAIL = 'INVALID_EMAIL',
  OPERATION_NOT_ALLOWED = 'OPERATION_NOT_ALLOWED',
  INVALID_LOGIN_CREDENTIALS = 'INVALID_LOGIN_CREDENTIALS',
  TOO_MANY_ATTEMPTS_TRY_LATER = 'TOO_MANY_ATTEMPTS_TRY_LATER',
}

export enum FetchMethod {
  Get = 'GET',
  Put = 'PUT',
  Post = 'POST',
  Patch = 'PATCH',
  Delete = 'DELETE',
}

export enum TaskStatus {
  Planned = 'planned',
  Progress = 'progress',
  Completed = 'completed',
}

export enum ProjectColors {
  SKY = '#0369a1',
  RED = '#b91c1c',
  BLUE = '#1d4ed8',
  TEAL = '#0d9488',
  LIME = '#65a30d',
  BEIGE = '#fb923c',
  INDIGO = '#4338ca',
  ORANGE = '#c2410c',
  EMERALD = '#059669',
  FUCHSIA = '#701a75',
  PINK_800 = '#9d174d',
  PINK_950 = '#500724',
  AMBER_500 = '#f59e0b',
  AMBER_950 = '#451a03',
  SLATE_700 = '#334155',
  SLATE_900 = '#0f172a',
}

export const PermittedUserRoles = [UserRole.TEAM_LEAD, UserRole.ADMIN];
