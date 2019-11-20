import axios from "../../config/initializers/axios";

const lib = {
  async uploadImage(file) {
    const path = "/upload/uploadImage";
    const res = await axios.post(path, file);

    return res;
  }
};

export default lib;
