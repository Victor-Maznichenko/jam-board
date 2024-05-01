import {AuthError} from '@/api/constants';

export const getErrorMessage = (error: Api.FirebaseError) => {
  switch (error.message) {
    case AuthError.EMAIL_EXISTS:
      return 'Пользователь с таким email уже существует';
    case AuthError.INVALID_EMAIL:
      return 'Адрес электронной почты неправильно введен.';
    case AuthError.OPERATION_NOT_ALLOWED:
      return 'Вход по паролю отключен для этого проекта';
    case AuthError.INVALID_LOGIN_CREDENTIALS:
      return 'Неправильный логин или пароль';
    case AuthError.TOO_MANY_ATTEMPTS_TRY_LATER:
      return 'Мы заблокировали все запросы с этого устройства из-за необычной активности. Повторите попытку позже.';
  }

  return error.message;
};
