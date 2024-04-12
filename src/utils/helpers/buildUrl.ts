interface BuildUrlParams {
  baseURL?: string;
  path?: string;
  params?: Record<string, unknown>;
}

export const buildUrl = ({baseURL = '', path = '', params}: BuildUrlParams) => {
  let url = baseURL + path;

  // Добавляем параметры в URL
  if (params) {
    const queryParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
      queryParams.set(key, String(value));
    }

    url += `?${queryParams.toString()}`;
  }

  return url;
};
