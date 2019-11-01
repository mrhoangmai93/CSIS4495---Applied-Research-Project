import axios from "../../../config/initializers/axios";
import { loadSellerFood } from "../../actions/seller/sellerProfile.action";

const lib = {
  async loadProfile(sellerId) {
    const path = `/seller/${sellerId}`;
    const res = await axios.get(path);

    return res;
  },

  async createSellerProfile(data) {
    const path = `/seller`;
    const res = await axios.post(path, data);
    return res;
  },
  async addFeedback(data) {
    const { sellerId } = data;
    const path = `/seller/feedback/${sellerId}`;
    const res = await axios.put(path, data);
    return res;
  },
  async deleteFeedback(sellerId) {
    const path = `/seller/removefeedback/${sellerId}`;
    const res = await axios.put(path);
    return res;
  },
  async loadSellerFood(sellerId) {
    let path = `/foods/seller`;
    //if there is seller Id => other user load
    //if not this seller load
    if (sellerId) {
      path = `/foods/seller/${sellerId}`;
    }
    const res = await axios.get(path);
    return res;
  }
};

export default lib;
