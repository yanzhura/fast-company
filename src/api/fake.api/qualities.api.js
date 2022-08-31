export const qualitiesObject = {
    tedious: {
        _id: '67rdca3eeb7f6fgeed471198',
        name: 'Нудила',
        color: 'primary'
    },
    strange: {
        _id: '67rdca3eeb7f6fgeed471100',
        name: 'Странный',
        color: 'secondary'
    },
    buller: {
        _id: '67rdca3eeb7f6fgeed4711012',
        name: 'Тролль',
        color: 'success'
    },
    alcoholic: {
        _id: '67rdca3eeb7f6fgeed471101',
        name: 'Алкоголик',
        color: 'danger'
    },
    handsome: {
        _id: '67rdca3eeb7f6fgeed471102',
        name: 'Красавчик',
        color: 'info'
    },
    uncertain: {
        _id: '67rdca3eeb7f6fgeed471103',
        name: 'Неуверенный',
        color: 'dark'
    }
};

const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(qualitiesObject);
        }, 1500);
    });

export default {
    fetchAll
};
