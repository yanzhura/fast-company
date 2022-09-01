import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import api from '../../../api';
import { objectToArray } from '../../../utils/utils';
import { validator } from '../../../utils/validator';
import MultiselectField from '../../common/form/MultiselectField';
import RadioFileld from '../../common/form/RadioFileld';
import SelectField from '../../common/form/SelectField';
import TextField from '../../common/form/TextField';

const UserEdit = () => {
    const { uid } = useParams();
    const [formData, setFormData] = useState(undefined);
    const [professions, setProfessions] = useState([]);
    const [qualities, setQualities] = useState([]);
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const genders = [
        { name: 'Мужской', value: 'male' },
        { name: 'Женский', value: 'female' },
        { name: 'Другой', value: 'other' }
    ];

    useEffect(() => {
        api.users.getById(uid).then((data) => setFormData(data));
        api.professions
            .fetchAll()
            .then((data) => setProfessions(objectToArray(data)));
        api.qualities
            .fetchAll()
            .then((data) => setQualities(objectToArray(data)));
    }, []);

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

    const validatorConfig = {
        name: {
            isRequired: {
                message: 'Поле "Имя" должно быть заполнено.'
            }
        },
        email: {
            isRequired: {
                message: 'Поле "электронная почта" должно быть заполнено.'
            },
            isEmail: {
                message: 'Email ведён некорректно'
            }
        },
        qualities: {
            isRequired: {
                message: 'Укажите хотя бы одно качество'
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        api.users.update(uid, formData);
        history.replace('/users');
    };

    const isValid = Object.keys(errors).length !== 0;

    return (
        <div className="m-2">
            {formData && (
                <form>
                    <TextField
                        label="Имя"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                    />
                    <TextField
                        label="Эл. почта"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                    <SelectField
                        options={professions}
                        label="Профессия"
                        name="profession"
                        onChange={handleChange}
                        value={formData.profession}
                    />
                    <RadioFileld
                        options={genders}
                        label="Пол"
                        name="sex"
                        value={formData.sex}
                        onChange={handleChange}
                    />
                    <MultiselectField
                        options={qualities}
                        label="Укажите свои качества"
                        name="qualities"
                        value={formData.qualities}
                        onChange={handleChange}
                        error={errors.qualities}
                    />
                    <button
                        onClick={handleSubmit}
                        disabled={isValid}
                        className="btn btn-primary"
                    >
                        Сохранить
                    </button>
                </form>
            )}
        </div>
    );
};

export default UserEdit;
