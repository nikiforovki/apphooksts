export const nameValidation = {
  required: 'Имя обязательно',
  minLength: {
    value: 4,
    message: 'Имя должно содержать минимум 4 символа',
  },
  pattern: {
    value: /^[A-Za-zА-Яа-я\s]+$/,
    message: 'Имя может содержать только буквы и пробелы',
  },
};

export const emailValidation = {
  required: 'Email обязателен',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Некорректный email',
  },
};

export const passwordValidation = {
  required: 'Пароль обязателен',
  minLength: {
    value: 6,
    message: 'Пароль должен содержать минимум 6 символов',
  },
  pattern: {
    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
    message: 'Пароль должен содержать хотя бы одну букву и одну цифру',
  },
};

export const confirmPasswordValidation = (password: string) => ({
  required: 'Подтвердите пароль',
  validate: (value: string) => value === password || 'Пароли не совпадают',
});
