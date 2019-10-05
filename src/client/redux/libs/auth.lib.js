import axios from '../../config/initializers/axios';
import {omit} from 'lodash';
const lib = {
    register({ name, email, password, role = "user" }) {
        const path = `/users/register/${role}`;
        return axios.post(path, {name, email, password}).then(res => res.data);
    },
};

export default lib;