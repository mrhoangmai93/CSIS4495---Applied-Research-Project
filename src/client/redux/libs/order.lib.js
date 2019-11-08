import axios from "../../config/initializers/axios";

const lib = {
  async loadOrders() {
    const path = `/orders`;

    const res = await axios.get(path);

    return res;
  },
  async loadPendingSellerOrders() {
    const path = `/orders/pending/seller`;

    const res = await axios.get(path);

    return res;
  },
  async sellerEditOrder(data) {
    const { id, order } = data;
    const path = `/orders/update/${id}`;

    const res = await axios.put(path, order);
    console.log(res.data);
    return res;
  },
  async loadCompletedSellerOrders() {
    const path = `/orders/completed/seller`;

    const res = await axios.get(path);

    return res;
  },
  async loadAllSellerOrders() {
    const path = `/orders/seller`;

    const res = await axios.get(path);

    return res;
  }
};

export default lib;
