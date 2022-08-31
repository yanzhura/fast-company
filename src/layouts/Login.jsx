import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import LoginForm from '../components/ui/LoginForm';
import RegisterForm from '../components/ui/RegisterForm';

const Login = () => {
    const { type } = useParams;
    const [formType, setFormType] = useState(
        type === 'register' ? type : 'login'
    );

    const toggleType = () => {
        setFormType((prevFormType) =>
            prevFormType === 'login' ? 'register' : 'login'
        );
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 p-4 shadow">
                    {formType === 'login' ? (
                        <>
                            <h1 className="mb-4">Вход</h1>
                            <LoginForm />
                            <a role="button" onClick={toggleType}>
                                Зарегистрируйтесь, если у вас нету учётной
                                записи.
                            </a>
                        </>
                    ) : (
                        <>
                            <h1 className="mb-4">Регистрация</h1>
                            <RegisterForm />
                            <a role="button" onClick={toggleType}>
                                Войдите, если у вас уже есть учётная запись.
                            </a>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
