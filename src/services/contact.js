import axios from "axios";

export const apiGet = async () => {
  try {
    const response = await axios({
      method: "get",
      url: `http://123.27.3.32:8072/kingsbet/api/get_ongoing?apikey=213saaw1mVLWwsAawjYr4Rx-Af50DDqtlx`,
    });
    return response; // Trả về dữ liệu từ response
  } catch (error) {
    throw error;
  }
};