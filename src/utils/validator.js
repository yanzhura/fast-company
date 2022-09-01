export function validator(data, config) {
    const errors = {};
    function validate(validateMethod, data, config) {
        let statusValidate;
        switch (validateMethod) {
            case 'isRequired': {
                if (typeof data === 'boolean') {
                    statusValidate = !data;
                } else if (typeof data === 'object') {
                    statusValidate = !data;
                } else {
                    statusValidate = data.trim() === '';
                }
                break;
            }

            case 'isEmail': {
                const emailRegExp = /^\S+@\S+\.\S+$/g;
                statusValidate = !emailRegExp.test(data);
                break;
            }

            case 'hasCapitalCharacters': {
                const capitalCharactersRegExp = /[A-Z]+/g;
                statusValidate = !capitalCharactersRegExp.test(data);
                break;
            }

            case 'hasDigits': {
                const digitsRegExp = /\d+/g;
                statusValidate = !digitsRegExp.test(data);
                break;
            }

            case 'minLength': {
                statusValidate = data.length < config.value;
                break;
            }

            case 'onlyLetters': {
                const lettersRegExp = /[A-Za-z]+/g;
                statusValidate = !lettersRegExp.test(data);
                break;
            }

            default:
                break;
        }
        if (statusValidate) return config.message;
    }

    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }
    return errors;
}
