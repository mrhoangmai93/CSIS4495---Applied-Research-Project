import axios from "../../config/initializers/axios";

const lib = {
  async loadOrders() {
    const path = `/orders`;

    const res = await axios.get(path);

    return res;
  }
};

export default lib;
