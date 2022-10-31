import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { validator } from '../../../utils/validator';
import BackButton from '../../common/BackButton';
import MultiselectField from '../../common/form/MultiselectField';
import RadioFileld from '../../common/form/RadioFileld';
import SelectField from '../../common/form/SelectField';
import TextField from '../../common/form/TextField';
import RandomAvatar from '../../common/RandomAvatar';
import { useProfession } from '../../../hooks/useProfessions';
import { useAuth } from '../../../hooks/useAuth';
import { useSelector } from 'react-redux';
import {
    getQualities,
    getQualitiesLoadingStatus
} from '../../../store/qualities';
import { currentUserData } from '../../../store/users';

const UserEdit = () => {
    const { uid } = useParams();
    const [formData, setFormData] = useState(undefined);
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const qualities = useSelector(getQualities());
    const qualityIsLoading = useSelector(getQualitiesLoadingStatus());

    const {
        isLoading: profIsLoading,
        professions,
        getProfession
    } = useProfession();
    const { update } = useAuth();
    const currentUser = useSelector(currentUserData());

    const genders = [
        { name: 'Мужской', value: 'male' },
        { name: 'Женский', value: 'female' },
        { name: 'Другой', value: 'other' }
    ];

    useEffect(() => {
        if (uid !== currentUser._id) {
            history.push(`/users/${currentUser._id}/edit`);
        }
    }, []);

    useEffect(() => {
        validate();
    }, [formData]);

    useEffect(() => {
        setFormData({
            ...currentUser,
            qualities: transformQualities(),
            profession: transformProfession()
        });
    }, [currentUser, qualityIsLoading, profIsLoading]);

    const transformQualities = () => {
        if (!qualityIsLoading) {
            const q = [];
            for (const id of currentUser.qualities) {
                q.push({
                    _id: id,
                    name: qualities.find((q) => q._id === id).name
                });
            }
            return q;
        } else {
            return [];
        }
    };

    const transformProfession = () => {
        if (!profIsLoading) {
            const prof = {
                _id: currentUser.profession,
                name: getProfession(currentUser.profession).name
            };
            return prof;
        }
    };

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...formData,
            qualities: formData.qualities.map((q) => q._id),
            profession: formData.profession._id
        };
        try {
            await update(newData);
            history.push('/');
        } catch (error) {
            setErrors(error);
        }
        history.replace(`/users/${uid}`);
    };

    const isValid = Object.keys(errors).length !== 0;

    return (
        <>
            {currentUser && !profIsLoading && !qualityIsLoading && formData && (
                <div className="card m-4" style={{ width: '25rem' }}>
                    <div className="card-header d-flex justify-content-between">
                        <h3>{currentUser.name}</h3>
                    </div>
                    <div className="card-body">
                        <div className="d-flex justify-content-center mb-2">
                            <RandomAvatar
                                size={80}
                                uid={currentUser._id}
                                gender={currentUser.gender}
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
            )}
        </>
    );
};

export default UserEdit;
