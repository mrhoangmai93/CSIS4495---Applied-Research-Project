import axios from "../../config/initializers/axios";

const lib = {
  async loadFoods() {
    const path = `foods`;
    const res = await axios.get(path);
    return res;
  },
  async searchFoods(term) {
    const path = `foods/search?term=${term}`;
    const res = await axios.get(path);
    return res;
  }
};

export default lib;
