import * as API from "../../API";
import * as AuthReducers from "./Reducers";

class AuthActions {
  static register(
    email,
    address,
    password,
    confirm_password,
    name,
    lastName,
    phone
  ) {
    return (dispatch) => {
      dispatch(AuthReducers.registerStart());
      API.Auth.register(
        email,
        address,
        password,
        confirm_password,
        name,
        lastName,
        phone
      )
        .then((res) => {
          dispatch(
            AuthReducers.loginSuccess({
              token: res.user.token,
              userData: res.user,
            })
          );
        })
        .catch((err) => {
          dispatch(AuthReducers.loginFail(err));
        });
    };
  }
  static login(email, password) {
    return (dispatch) => {
      dispatch(AuthReducers.loginStart());
      API.Auth.login(email, password)
        .then((res) => {
          dispatch(
            AuthReducers.loginSuccess({
              token: res.token,
              userData: res.user,
            })
          );
        })
        .catch((err) => {
          dispatch(AuthReducers.loginFail(err));
        });
    };
  }
  static logut() {
    return (dispatch) => {
      dispatch(AuthReducers.logout());
    };
  }
  static getMe() {
    return (dispatch, getState) => {
      const token = getState().Auth.token;
      API.Auth.getMe(token)
        .then((res2) => {
          dispatch(
            AuthReducers.loginSuccess({
              token: token,
              userData: res2.user,
            })
          );
        })
        .catch((err) => console.log(err));
    };
  }

  static updateUser(first_name, last_name, address, image) {
    return (dispatch, getState) => {
      const token = getState().Auth.token;
      API.Auth.updateUser(token, first_name, last_name, address, image)
        .then((res) => {
          console.log("reso", res);
          // dispatch(res.updatedProfile(res));
          dispatch(this.getMe());
        })
        .catch((err) => console.log("err", err));
    };
  }

  static changePassword(old_password, new_password, confirm_password) {
    return (dispatch, getState) => {
      const token = getState().Auth.token;
      API.Auth.changePassword(
        token,
        old_password,
        new_password,
        confirm_password
      )
        .then((res) => {
          console.log("reso", res);
          // dispatch(res.changePassword(res));
          dispatch(this.getMe());
        })
        .catch((err) => console.log("err", err));
    };
  }

  static forgotPassword(email) {
    console.log({ email });
    return (dispatch) => {
      API.Auth.forgotPassword(email)
        .then((res) => {
          console.log("reso", res);
          return res;
          // dispatch(this.getMe());
        })
        .catch((err) => console.log("err", err));
    };
  }
}
export default AuthActions;
