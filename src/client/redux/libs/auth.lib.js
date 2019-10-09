import axios from "../../config/initializers/axios";

import { omit } from "lodash";
const lib = {
  async register({ name, email, password, role = "user" }) {
    const path = `/users/register/${role}`;

    const res = await axios.post(path, { name, email, password });

    return res;
  }
};

export default lib;
