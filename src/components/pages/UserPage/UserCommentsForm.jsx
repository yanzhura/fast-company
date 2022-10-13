import React, { useState, useEffect } from 'react';
import { validator } from '../../../utils/validator';
import TextAreaField from '../../common/form/TextAreaField';
import { useComments } from '../../../hooks/useComments';

const UserCommentsForm = () => {
    const { createComment } = useComments();

    const [formData, setFormData] = useState({
        content: ''
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

    const validatorConfig = {
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
        createComment(formData.content);
        setFormData({
            content: ''
        });
    };

    const isValid = Object.keys(errors).length !== 0;

    return (
        <>
            <form>
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

export default UserCommentsForm;
