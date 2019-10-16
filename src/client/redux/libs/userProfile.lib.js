import axios from "../../config/initializers/axios";

const lib = {
  async loadProfile() {
    const path = "/userinfo";
    const res = await axios.get(path);

    return res;
  },

  async editAddress(data) {
    const path = `/userinfo/address`;

    const res = await axios.post(path, data);
    return res;
  },
  async editPayment(data) {
    const path = `/userinfo/payment`;

    const res = await axios.put(path, data);
    return res;
  },
  async deletePayment(data) {
    const { paymentId } = data;
    const path = `/userinfo/removepayment/${paymentId}`;

    const res = await axios.put(path, data);
    return res;
  }
};

export default lib;
