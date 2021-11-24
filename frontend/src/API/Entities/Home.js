import Request from "../Request";
import { Platform } from "react-native";

import axios from "axios";

class Home {
  static async getCategories() {
    let data = await Request.get(`/category/all`);
    return data;
  }

  static async getProducts(token) {
    let data = await Request.get("/product/all", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }

  static async getProductDetails(token, id, prodNeed) {
    let data = await Request.get(`/${prodNeed}/one?product_id=${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }

  static async getNeedDetails(token, id, need) {
    let data = await Request.get(`/need/one?product_id=${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }

  static async getAverageReviews(token) {
    let data = await Request.get("/review/average", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }

  static async rateApp(token, review_score, review_description) {
    let data = await Request.post(
      "/review/create",
      {
        review_score,
        review_description,
      },
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }

  static async getAllDeals(token) {
    let data = await Request.get("/deal/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }

  static async createComment(token, post_id, comment) {
    let data = await Request.post(
      "/comment/create",
      {
        post_id,
        comment,
      },
      {
        headers: {
          // "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }

  static async getAllNeeds(token) {
    let data = await Request.get("/need/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }

  static async createProduct(
    token,
    images,
    product_name,
    address,
    category_id,
    description
  ) {
    const formData = new FormData();

    images.forEach((element) => {
      formData.append("images", {
        name: element.fileName,
        type: element.type,
        uri:
          Platform.OS === "ios"
            ? element.uri.replace("file://", "")
            : element.uri,
      });
    });

    formData.append("product_name", product_name);
    formData.append("address", address);
    formData.append("category_id", category_id);
    formData.append("description", description);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type":
          'multipart/form-data; charset=utf-8; boundary="another cool boundary";',
      },
    };

    axios
      .post("http://192.168.178.65:3000/api/product/create", formData, config)
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static async createNeed(
    token,
    images,
    product_name,
    address,
    category_id,
    description
  ) {
    const formData = new FormData();

    images.forEach((element) => {
      formData.append("images", {
        name: element.fileName,
        type: element.type,
        uri:
          Platform.OS === "ios"
            ? element.uri.replace("file://", "")
            : element.uri,
      });
    });
    formData.append("product_name", product_name);
    formData.append("address", address);
    formData.append("category_id", category_id);
    formData.append("description", description);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type":
          'multipart/form-data; charset=utf-8; boundary="another cool boundary";',
      },
    };

    axios
      .post("http://192.168.178.65:3000/api/need/create", formData, config)
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static async getCategoryItems(token, id, prodNeed) {
    let data = await Request.get(`/${prodNeed}/all?category_id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }

  static async search(token, text, prodNeed) {
    let data = await Request.get(`/${prodNeed}/all?search=${text}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }

  static async addDeal(token, post_id) {
    let data = await Request.post(
      `/deal/create`,
      { post_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }
}
export default Home;
