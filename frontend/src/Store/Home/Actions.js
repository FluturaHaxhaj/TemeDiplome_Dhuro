import * as API from "../../API";
import * as HomeReducers from "./Reducers";

class HomeActions {
  static getCategories() {
    return (dispatch) => {
      dispatch(HomeReducers.getCategoriesStart());
      API.Home.getCategories()
        .then((res) =>
          dispatch(HomeReducers.getCategoriesSuccess(res.allCategories))
        )
        .catch((err) => dispatch(HomeReducers.getCategoriesFail(err)));
    };
  }

  static getProducts() {
    return (dispatch, getState) => {
      dispatch(HomeReducers.getProductsStart());
      const token = getState().Auth.token;
      API.Home.getProducts(token)
        .then((res) =>
          dispatch(
            HomeReducers.getProductsSuccess(res.products.productsWithImages)
          )
        )
        .catch((err) => dispatch(HomeReducers.getProductsFail(err)));
    };
  }
  static getProductDetails(id, prodNeed) {
    console.log({ prodNeed });
    return (dispatch, getState) => {
      dispatch(HomeReducers.getDetailsStart());
      const token = getState().Auth.token;
      API.Home.getProductDetails(token, id, prodNeed)
        .then((res) => {
          console.log({ "Response: ": res });
          dispatch(HomeReducers.getDetailsSuccess(res.product));
        })
        .catch((err) => dispatch(HomeReducers.getDetailsFail(err)));
    };
  }

  static getNeedDetails(id, need) {
    console.log(id, need);
    return (dispatch, getState) => {
      dispatch(HomeReducers.getDetailsStart());
      console.log("vvv");
      const token = getState().Auth.token;
      API.Home.getNeedDetails(token, id, need)
        .then((res) => {
          dispatch(HomeReducers.getNeedsSuccess(res.need));
        })
        .catch((err) => dispatch(HomeReducers.getNeedsFail(err)));
    };
  }
  static getAverageReviews() {
    return (dispatch, getState) => {
      const token = getState().Auth.token;
      API.Home.getAverageReviews(token).then((res) =>
        dispatch(HomeReducers.getReviewsSuccess(res.averageReview.avg))
      );
    };
  }
  static rateApp(rate, desc) {
    return (dispatch, getState) => {
      const token = getState().Auth.token;
      API.Home.rateApp(token, rate, desc)
        .then((res) => dispatch(this.getAverageReviews()))
        .catch((err) => console.log(err));
    };
  }
  static getAllDeals() {
    return (dispatch, getState) => {
      dispatch(HomeReducers.getAllDealsStart());
      const token = getState().Auth.token;
      API.Home.getAllDeals(token)
        .then((res) => dispatch(HomeReducers.getAllDealsSuccess(res.deals)))
        .catch((err) => dispatch(HomeReducers.getAllDealsFail(err)));
    };
  }
  static createComment(postId, comment, productId) {
    return (dispatch, getState) => {
      const token = getState().Auth.token;
      API.Home.createComment(token, postId, comment)
        .then((res) => dispatch(this.getProductDetails(productId)))
        .catch((err) => console.log("hello there", err));
    };
  }
  static getAllNeeds() {
    return (dispatch, getState) => {
      dispatch(HomeReducers.getNeedsStart());
      const token = getState().Auth.token;

      API.Home.getAllNeeds(token)
        .then((res) =>
          dispatch(HomeReducers.getNeedsSuccess(res.needs.needsWithImages))
        )
        .catch((err) => dispatch(HomeReducers.getNeedsFail(err)));
    };
  }
  static createProduct(
    product_name,
    address,
    category_id,
    description,
    images
  ) {
    return (dispatch, getState) => {
      const token = getState().Auth.token;
      API.Home.createProduct(
        token,
        product_name,
        address,
        category_id,
        description,
        images
      )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    };
  }
  static createNeed(product_name, address, category_id, description, images) {
    return (dispatch, getState) => {
      const token = getState().Auth.token;
      API.Home.createNeed(
        token,
        product_name,
        address,
        category_id,
        description,
        images
      )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    };
  }

  static getItemsFromCategory(prodNeed, id) {
    return (dispatch, getState) => {
      const token = getState().Auth.token;
      console.log({ "Is prod or need: ": prodNeed });
      API.Home.getCategoryItems(token, id, prodNeed)
        .then((res) =>
          dispatch(
            HomeReducers.getCategoryItemsSuccess(
              prodNeed === "product"
                ? res.products.productsWithImages
                : res.needs.needsWithImages
            )
          )
        )
        .catch((err) => console.log(err));
    };
  }

  static addDeal(id) {
    return (dispatch, getState) => {
      const token = getState().Auth.token;
      API.Home.addDeal(token, id).then((res) => console.log(res));
    };
  }

  static search(prodNeed, text) {
    return (dispatch, getState) => {
      const token = getState().Auth.token;
      API.Home.search(token, text, prodNeed).then((res) =>
        dispatch(
          HomeReducers.setSearchedItems(
            prodNeed === "product"
              ? res.products.productsWithImages
              : res.needs.needsWithImages
          )
        )
      );
    };
  }
}
export default HomeActions;
