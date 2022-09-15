import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../../api';
import { validator } from '../../../utils/validator';
import SelectField from '../../common/form/SelectField';
import TextAreaField from '../../common/form/TextAreaField';
import { useParams } from 'react-router-dom';

const UserCommentsForm = ({ onNewComment }) => {
    const { uid } = useParams();

    const [formData, setFormData] = useState({
        user: '',
        content: ''
    });
    const [errors, setErrors] = useState({});
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(data);
        });
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

    const handleClear = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            user: ''
        }));
    };

    const validate = () => {
        const errors = validator(formData, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validatorConfig = {
        user: {
            isRequired: {
                message:
                    'Выберите пользователя, от имени которого ставляете комментарий.'
            }
        },
        content: {
            isRequired: {
                message: 'Нельзя отправить пустой комментарий.'
            },
            lessThan50symbols: {
                message:
                    'Текст комментария не должен быть длиннее, чем 50 символов.'
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        api.comments
            .add({
                pageId: uid,
                userId: formData.user._id,
                content: formData.content
            })
            .then((data) => {
                setFormData({
                    user: '',
                    content: ''
                });
                onNewComment(data);
            });
    };

    const isValid = Object.keys(errors).length !== 0;

    return (
        <>
            <form>
                <SelectField
                    options={users}
                    name="user"
                    tip="Выберите пользователя..."
                    value={formData.user}
                    onChange={handleChange}
                    onClear={handleClear}
                    error={errors.user}
                />
                <TextAreaField
                    label="Комментарий"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    error={errors.content}
                />
                <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={isValid}
                >
                    Опубликовать
                </button>
            </form>
        </>
    );
};

UserCommentsForm.propTypes = {
    onNewComment: PropTypes.func.isRequired
};

export default UserCommentsForm;
