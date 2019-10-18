import axios from "../../../config/initializers/axios";

const lib = {
  async loadProfile() {
    const path = "/seller";
    const res = await axios.get(path);

    return res;
  },

  async createSellerProfile(data) {
    const path = `/seller`;
    const res = await axios.post(path, data);
    return res;
  }
};

export default lib;
