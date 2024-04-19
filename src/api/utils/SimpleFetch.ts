import {UnknownObject} from '@/types';

import {buildUrl} from '@/utils/helpers';

import {FetchMethod, FirebaseError, RequestParams, SimpleFetchParams} from '../types';

export class SimpleFetch {
  public baseURL?: string;
  public options: RequestInit;
  public defaultParams?: UnknownObject;
  private controller: AbortController;

  constructor({baseURL, params, options}: SimpleFetchParams) {
    this.baseURL = baseURL;
    this.defaultParams = params;
    this.controller = new AbortController();
    this.options = {
      ...options,
      signal: this.controller.signal,
      cache: 'no-cache',
    };
  }

  async get({path}: Pick<RequestParams, 'path'>) {
    return await this.request({
      method: FetchMethod.Get,
      path,
    });
  }

  async put({path, params, body}: Omit<RequestParams, 'baseURL' | 'method'>) {
    return await this.request({
      method: FetchMethod.Put,
      path,
      params,
      body,
    });
  }

  async post({path, params, body}: Omit<RequestParams, 'baseURL' | 'method'>) {
    return await this.request({
      method: FetchMethod.Post,
      path,
      params,
      body,
    });
  }

  async patch({path, params, body}: Omit<RequestParams, 'baseURL' | 'method'>) {
    return await this.request({
      method: FetchMethod.Patch,
      path,
      params,
      body,
    });
  }
  async delete({path}: Pick<RequestParams, 'path'>) {
    return await this.request({
      method: FetchMethod.Delete,
      path,
    });
  }

  cancel() {
    this.controller.abort();
  }

  private async request({method, path, params, body = null}: RequestParams) {
    const buildUrlConfig = {
      baseURL: this.baseURL,
      path,
      params: {
        ...this.defaultParams,
        ...params,
      },
    };
    const buildedURL = buildUrl(buildUrlConfig);

    const response = await fetch(buildedURL, this.getFetchOptions(method, body));

    if (!response.ok) {
      const {error} = await response.json();
      throw error as FirebaseError;
    }

    return await response.json();
  }

  getFetchOptions(method: FetchMethod, body: UnknownObject | null) {
    if (method === FetchMethod.Get || !method) return this.options;
    return {
      ...this.options,
      method,
      headers: {
        ...this.options.headers,
        'Content-Type': 'application/json',
      },
      body: !body ? body : JSON.stringify(body),
    };
  }

  updateOptions(options: RequestInit) {
    this.options = {
      ...this.options,
      ...options,
    };
  }
}
