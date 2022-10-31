export const generateAuthError = (message) => {
    switch (message) {
        case 'INVALID_PASSWORD':
            return 'Неправильный логин или пароль';
        case 'EMAIL_EXISTS':
            return 'Пользователь с таким email уже существует';
        default:
            return 'Слишком много попыток входа';
    }
};
