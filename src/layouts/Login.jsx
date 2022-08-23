import React, { useEffect, useState } from 'react';
import TextField from '../components/TextField';
import { validator } from '../utils/validator';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        validate();
    }, [formData]);

    const handleChange = ({ target }) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [target.name]: target.value
        }));
    };

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

    const validate = () => {
        const errors = validator(formData, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log('formData :>> ', formData);
        setFormData({
            email: '',
            password: ''
        });
    };

    const isValid = Object.keys(errors).length !== 0;

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 p-4 shadow">
                    <h3 className="mb-4">Вход</h3>
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
                        <button
                            onClick={handleSubmit}
                            disabled={isValid}
                            className="btn btn-primary w-100 mx-auto"
                        >
                            Вход
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
