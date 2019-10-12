import axios from "../../config/initializers/axios";

const lib = {
  async loadCart() {
    const path = "/cart";
    const res = await axios.get(path);

    return res;
  },
  async addToCart({ foodId, quantity }) {
    const path = `/cart/add/${foodId}/${quantity}`;
    const res = await axios.post(path);
    return res;
  },
  async deleteFromCart({ foodId }) {
    const path = `/cart/delete/${foodId}`;
    const res = await axios.delete(path);
    return res;
  }
};

export default lib;
