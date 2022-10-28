import React, { useEffect, useState } from 'react';
import TextField from '../common/form/TextField';
import CheckboxField from '../common/form/CheckboxField';
import { validator } from '../../utils/validator';
import { signIn } from '../../store/users';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        stayOnline: false
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        validate();
    }, [formData]);

    const handleChange = ({ name, value }) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const validate = () => {
        const errors = validator(formData, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const redirect = history.location.state
            ? history.location.state.from.pathname
            : '/';
        dispatch(signIn({ payload: formData, redirect }));
    };

    const isValid = Object.keys(errors).length !== 0;

    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Поле "электронная почта" должно быть заполнено.'
            },
            isEmail: {
                message: 'Email ведён некорректно'
            }
        },
        password: {
            isRequired: {
                message: 'Поле "пароль" должно быть заполнено.'
            },
            hasCapitalCharacters: {
                message: 'В пароле должа быть хотя бы одна заглавная буква'
            },
            hasDigits: {
                message: 'В пароле должа быть хотя бы одна цифра'
            },
            minLength: {
                message: 'пароль должен содержать не менее 8 символов',
                value: 8
            }
        }
    };

    return (
        <>
            <form>
                <TextField
                    label="Эл. почта"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <TextField
                    label="Пароль"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                />
                <CheckboxField
                    name="stayOnline"
                    value={formData.stayOnline}
                    onChange={handleChange}
                >
                    Запомнить меня
                </CheckboxField>
                <button
                    onClick={handleSubmit}
                    disabled={isValid}
                    className="btn btn-primary w-100 mx-auto"
                >
                    Вход
                </button>
            </form>
        </>
    );
};

export default LoginForm;
