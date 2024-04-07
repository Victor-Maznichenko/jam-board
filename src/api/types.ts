export type UnknownObject<T = unknown> = {
  [key: string]: T;
};

export interface AuthData {
  email: string;
  password: string;
}

export interface FirebaseError {
  code: number;
  errors: Error[];
  message: string;
}

export interface CreateDocParams {
  accessToken: string;
  path: string;
  documentId: string;
}

export interface UpdateDocParams {
  accessToken: string;
  path: string;
  body: UnknownObject;
}

export interface GetDocParams {
  accessToken: string;
  path: string;
  maskArray?: string[];
}

export interface Request {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  instance?: 'auth' | 'base';
  accessToken?: string;
}
