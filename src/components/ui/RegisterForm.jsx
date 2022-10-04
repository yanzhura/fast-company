import React, { useEffect, useState } from 'react';
import TextField from '../common/form/TextField';
import { validator } from '../../utils/validator';
import SelectField from '../common/form/SelectField';
import RadioFileld from '../common/form/RadioFileld';
import MultiselectField from '../common/form/MultiselectField';
import CheckboxField from '../common/form/CheckboxField';
import { useQuality } from '../../hooks/useQualities';
import { useProfession } from '../../hooks/useProfessions';

const RegisterForm = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        profession: '',
        gender: 'male',
        qualities: [],
        license: false
    });
    const [errors, setErrors] = useState({});
    const { professions } = useProfession();
    const { qualities } = useQuality();

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
        console.log('submit :>> ', formData);
        const isValid = validate();
        if (!isValid) return;
        setFormData({
            email: '',
            password: '',
            profession: '',
            gender: 'male',
            qualities: [],
            license: false
        });
        setIsLoggedIn(true);
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
                message: 'Пароль должен содержать не менее 8 символов',
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: 'Поле "профессия" должно быть заполнено'
            }
        },
        license: {
            isRequired: {
                message: 'Вы должны одобрить лицензионное соглашение'
            }
        }
    };

    const genders = [
        { name: 'Мужской', value: 'male' },
        { name: 'Женский', value: 'female' },
        { name: 'Другой', value: 'other' }
    ];

    return (
        <>
            {!isLoggedIn ? (
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
                    <SelectField
                        options={professions}
                        label="Укажите свою профессию"
                        name="profession"
                        tip="Профессия..."
                        onChange={handleChange}
                        value={formData.profession}
                        error={errors.profession}
                    />
                    <RadioFileld
                        options={genders}
                        label="Укажите пол"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    />
                    <MultiselectField
                        options={qualities}
                        label="Укажите свои качества"
                        name="qualities"
                        value={formData.qualities}
                        onChange={handleChange}
                    />
                    <CheckboxField
                        name="license"
                        value={formData.license}
                        onChange={handleChange}
                        error={errors.license}
                    >
                        Я согласен с лицензионным соглашением.
                    </CheckboxField>
                    <button
                        onClick={handleSubmit}
                        disabled={isValid}
                        className="btn btn-primary w-100 mx-auto"
                    >
                        Зарегистрироваться
                    </button>
                </form>
            ) : (
                <h3>Учётная запись успешно создана</h3>
            )}
        </>
    );
};

export default RegisterForm;
