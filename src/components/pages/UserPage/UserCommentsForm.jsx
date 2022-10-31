import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createComment } from '../../../store/comments';
import { getCurrentUserId } from '../../../store/users';
import { validator } from '../../../utils/validator';
import TextAreaField from '../../common/form/TextAreaField';

const UserCommentsForm = () => {
    const dispatch = useDispatch();
    const { uid } = useParams();
    const currentUserId = useSelector(getCurrentUserId());

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
        dispatch(
            createComment({
                content: formData.content,
                pageId: uid,
                userId: currentUserId
            })
        );
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
