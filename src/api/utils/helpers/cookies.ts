interface CookieOptions {
  expires?: string;
  'max-age'?: number;
  secure?: boolean;
  domain?: string;
  path?: string;
}

export const getCookie = (name: string) => {
  let foundCookie: string | undefined;
  document.cookie.split('; ').forEach((cookie) => {
    const parts = cookie.split('=');
    if (parts[0] === name) foundCookie = decodeURIComponent(parts[1]);
  });
  return foundCookie;
};

export const setCookie = (name: string, value: unknown, options?: CookieOptions) => {
  // Гененируем куку
  let cookieStr = encodeURIComponent(name) + '=' + encodeURIComponent(String(value));
  if (options) {
    for (const [key, value] of Object.entries(options)) {
      cookieStr += `; ${key}=${value}`;
    }
  }

  // Записываем куку
  document.cookie = cookieStr;
};

export const deleteCookie = (name: string) => {
  const cookieName = encodeURIComponent(name);
  document.cookie = `${cookieName}=; max-age=0`;
};
