import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import api from '../../../api';
import { objectToArray } from '../../../utils/utils';
import { validator } from '../../../utils/validator';
import BackButton from '../../common/BackButton';
import MultiselectField from '../../common/form/MultiselectField';
import RadioFileld from '../../common/form/RadioFileld';
import SelectField from '../../common/form/SelectField';
import TextField from '../../common/form/TextField';
import UserCardPreloader from '../../ui/UserCardPreloader';
import RandomAvatar from '../../common/RandomAvatar';

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
        <>
            {formData ? (
                <div className="card m-4" style={{ width: '25rem' }}>
                    <div className="card-header d-flex justify-content-between">
                        <h3>{formData.name}</h3>
                    </div>
                    <div className="card-body">
                        <div className="d-flex justify-content-center mb-2">
                            <RandomAvatar
                                size={80}
                                uid={uid}
                                gender={formData.sex}
                            />
                        </div>
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
                        </form>
                    </div>
                    <div className="card-footer d-flex justify-content-between">
                        <BackButton path={`/users/${uid}`} title="Назад" />
                        <button
                            onClick={handleSubmit}
                            disabled={isValid}
                            className="btn btn-sm btn-primary"
                        >
                            Сохранить
                        </button>
                    </div>
                </div>
            ) : (
                <UserCardPreloader />
            )}
        </>
    );
};

export default UserEdit;
