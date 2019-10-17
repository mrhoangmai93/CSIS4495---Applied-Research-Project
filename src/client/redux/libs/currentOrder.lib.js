import axios from "../../config/initializers/axios";

const lib = {
  async placeOrder(data) {
    const path = `/orders`;
    const res = await axios.post(path, data);
    return res;
  }
};

export default lib;
