import React from 'react';
import PropTypes from 'prop-types';

const SearchStatus = ({ usersNumber }) => {
    const getPhrase = () => {
        const lastDigit = Number(usersNumber.toString().at(-1));
        const preLastDigit = Number(usersNumber.toString().at(-2)) || 0;
        if (preLastDigit !== 1 && lastDigit >= 2 && lastDigit <= 4) {
            return 'человека тусанут';
        } else {
            return 'человек тусанёт';
        }
    };

    const statusText = usersNumber
        ? `${usersNumber} ${getPhrase()} с тобой сегодня`
        : 'Никто с тобой не тусанёт';

    return (
        <h3>
            <div
                className={
                    'badge ' + (usersNumber ? 'bg-primary' : 'bg-danger')
                }
            >
                {statusText}
            </div>
        </h3>
    );
};

SearchStatus.propTypes = {
    usersNumber: PropTypes.number.isRequired
};

export default SearchStatus;
