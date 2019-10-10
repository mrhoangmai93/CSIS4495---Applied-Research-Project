import axios from "../../config/initializers/axios";

import { omit } from "lodash";
const lib = {
  async register({ name, email, password, role = "user" }) {
    const path = `/users/register/${role}`;

    const res = await axios.post(path, { name, email, password });

    return res;
  },
  async login({ email, password }) {
    const path = `/auth/user`;

    const res = await axios.post(path, { email, password });

    return res;
  },
  async loadUser() {
    const path = `/auth`;

    const res = await axios.get(path);

    return res;
  }
};

export default lib;
