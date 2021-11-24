import Request from "../Request";
import { Platform } from "react-native";
import axios from "axios";

class Auth {
  static async register(
    email,
    address,
    password,
    confirm_password,
    first_name,
    last_name,
    phone_number
  ) {
    let data = await Request.post(
      `/user/register`,
      {
        special_status: false,
        email,
        address,
        password,
        confirm_password,
        first_name,
        last_name,
        phone_number,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    return data;
  }

  static async login(email, password) {
    let data = await Request.post(
      "/user/login",
      {
        email,
        password,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    return data;
  }

  static async updateUser(token, first_name, last_name, address, image) {
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("address", address);
    formData.append("image", {
      name: image.assets[0].fileName,
      type: image.assets[0].type,
      uri:
        Platform.OS === "ios"
          ? image.assets[0].uri.replace("file://", "")
          : image.assets[0].uri,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type":
          'multipart/form-data; charset=utf-8; boundary="another cool boundary";',
      },
    };

    axios
      .put("http://192.168.178.65:3000/api/user/update", formData, config)
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static async getMe(token) {
    let data = await Request.get("/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }

  static async changePassword(
    token,
    old_password,
    new_password,
    confirm_password
  ) {
    let data = await Request.put(
      "/user/change-password",
      {
        old_password,
        new_password,
        confirm_password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      }
    );
    return data;
  }

  static async forgotPassword(email) {
    let data = await Request.post(
      "/user/forgot-password",
      {
        email,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    return data;
  }
}
export default Auth;
