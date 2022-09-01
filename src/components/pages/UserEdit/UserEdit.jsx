import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api';
import { objectToArray } from '../../../utils/utils';
import MultiselectField from '../../common/form/MultiselectField';
import RadioFileld from '../../common/form/RadioFileld';
import SelectField from '../../common/form/SelectField';
import TextField from '../../common/form/TextField';

const UserEdit = () => {
    const { uid } = useParams();
    const [formData, setFormData] = useState(undefined);
    const [professions, setProfessions] = useState([]);
    const [qualities, setQualities] = useState([]);

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

    const handleChange = ({ name, value }) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    return (
        <div className="m-2">
            {formData && (
                <form>
                    <TextField
                        label="Имя"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Эл. почта"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
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
                    />
                    <button>Сохранить изменения</button>
                </form>
            )}
        </div>
    );
};

export default UserEdit;
