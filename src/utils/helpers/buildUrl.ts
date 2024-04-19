import {BuildUrlParams} from '@/api/types';

export const buildUrl = ({baseURL = '', path = '', params}: BuildUrlParams) => {
  let url = baseURL + path;

  // Добавляем параметры в URL
  if (params && Object.keys(params)) {
    const queryParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
      queryParams.set(key, String(value));
    }

    url += `?${queryParams.toString()}`;
  }

  return url;
};
