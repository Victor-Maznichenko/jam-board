import {UnknownObject} from '@/types';

import {UserRole} from './constants';

export type DocFields = Record<string, Record<string, unknown>>;

export interface Document {
  name: string;
  createTime: string;
  updateTime: string;
  fields: DocFields;
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

export enum RequestStatus {
  Pending = 'pending',
  Loading = 'loading',
  Success = 'success',
  Fail = 'fail',
}

export interface User {
  uid: string;
  email: string;
  role: UserRole;
  displayName: string;
}

export interface UpdateRequestParams {
  path: string;
  body: Record<string, unknown>;
}

export interface CreateDocByIdParams {
  path: string;
  id: string;
}

export interface Project {
  id: string;
  title: string;
  currentColor: string;
  boards: Boards;
}
export interface Boards {
  planned: Board;
  inProgress: Board;
  complete: Board;
}

export interface Board {
  id: string;
  title: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  executor: User;
  isFailed: boolean;
  description?: string;
  deadlineDate: string;
}

// НОВЫЕ ТИПЫ
export interface BuildUrlParams {
  baseURL?: string;
  path?: string;
  params?: UnknownObject;
}

export interface SimpleFetchParams extends Omit<BuildUrlParams, 'path'> {
  options?: RequestInit;
}

export interface RequestParams extends BuildUrlParams {
  method: FetchMethod;
  body?: UnknownObject | null;
}

export enum FetchMethod {
  Get = 'GET',
  Put = 'PUT',
  Post = 'POST',
  Patch = 'PATCH',
  Delete = 'DELETE',
}
