import React from 'react';
import BackButton from '../common/BackButton';

const NotFound = () => {
    return (
        <div className="m-2">
            <h2>Ошибка 404</h2>
            <p>Страница не найдена</p>
            <br />
            <BackButton title="Вернуться на главную" path="/" />
        </div>
    );
};

export default NotFound;
