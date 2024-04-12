// Firebase configuration
export const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
export const AUTH_DOMAIN = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
export const PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;
export const STORAGE_BUCKET = import.meta.env.VITE_FIREBASE_STOGRAGE_BUCKET;
export const MESSAGING_SENDER_ID = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
export const APP_ID = import.meta.env.VITE_FIREBASE_APP_ID;

// Api URLS
export const AUTH_URL: string = import.meta.env.VITE_FIREBASE_AUTH_URL;
export const BASE_URL: string = import.meta.env.VITE_FIREBASE_BASE_URL;
export const TOKEN_URL: string = import.meta.env.VITE_FIREBASE_TOKEN_URL;

export const TOKENS_NAMES = {
  refresh: 'refreshToken',
  access: 'accessToken',
};
