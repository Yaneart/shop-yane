export const AUTH_TEXT = {
  login: {
    title: 'Вход в аккаунт',
    subtitle: 'Введите данные для входа',
    submit: 'Войти',
    successToast: 'Вход выполнен (демо)',
  },
  register: {
    title: 'Создать аккаунт',
    subtitle: 'Заполните форму для регистрации',
    submit: 'Зарегистрироваться',
    successToast: 'Регистрация выполнена (демо)',
  },
} as const;

export const AUTH_ERRORS = {
  emptyFields: 'Заполните все поля',
  emptyName: 'Введите имя',
  shortPassword: 'Пароль должен быть не менее 6 символов',
} as const;

export const MIN_PASSWORD_LENGTH = 6;
