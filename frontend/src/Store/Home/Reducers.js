import { createSlice } from "@reduxjs/toolkit";
import State from "../State";

const initialState = {
  categories: [],
  loadingCategories: State.NOT_PROCESSED,
  errorCategories: null,
  products: [],
  loadingProducts: State.NOT_PROCESSED,
  errorProducts: null,
  loadingDetails: State.NOT_PROCESSED,
  errorDetails: null,
  productDetails: null,
  averageReview: null,
  deals: [],
  loadingDeals: State.NOT_PROCESSED,
  errorDeals: null,
  needs: [],
  loadingNeeds: State.NOT_PROCESSED,
  errorNeeds: null,
  selectedCategoryItems: [],
  searchedItems: null,
};

const slice = createSlice({
  name: "Home",
  initialState,
  reducers: {
    getCategoriesStart(state) {
      state.loadingCategories = State.PROCESSING;
    },
    getCategoriesFail(state, action) {
      state.loadingCategories = State.FAILED;
      state.errorCategories = action.payload;
    },
    getCategoriesSuccess(state, action) {
      state.loadingCategories = State.DONE;
      state.categories = action.payload;
    },
    getProductsStart(state) {
      state.loadingProducts = State.PROCESSING;
    },
    getProductsFail(state, action) {
      state.loadingProducts = State.FAILED;
      state.errorProducts = action.payload;
    },
    getProductsSuccess(state, action) {
      state.loadingProducts = State.DONE;
      state.products = action.payload;
    },
    getDetailsStart(state) {
      state.loadingDetails = State.PROCESSING;
    },
    getDetailsFail(state, action) {
      state.loadingDetails = State.FAILED;
      state.errorDetails = action.payload;
    },
    getDetailsSuccess(state, action) {
      state.loadingDetails = State.DONE;
      state.productDetails = action.payload;
    },
    getNeedsFail(state, action) {
      state.loadingDetails = State.FAILED;
      state.errorDetails = action.payload;
    },
    getNeedsSuccess(state, action) {
      state.loadingDetails = State.DONE;
      state.needDetails = action.payload;
    },
    getReviewsSuccess(state, action) {
      state.averageReview = action.payload;
    },
    getAllDealsStart(state) {
      state.loadingDeals = State.PROCESSING;
    },
    getAllDealsFail(state, action) {
      state.loadingDeals = State.FAILED;
      state.errorDeals = action.payload;
    },
    getAllDealsSuccess(state, actoin) {
      state.loadingDeals = State.DONE;
      state.deals = actoin.payload;
    },
    getNeedsStart(state) {
      state.loadingNeeds = State.PROCESSING;
    },
    getNeedsFail(state, action) {
      state.loadingNeeds = State.FAILED;
      state.errorNeeds = action.payload;
    },
    getNeedsSuccess(state, action) {
      state.loadingNeeds = State.DONE;
      state.needs = action.payload;
    },
    getCategoryItemsSuccess(state, action) {
      state.selectedCategoryItems = action.payload;
    },
    clearCategoryItems(state) {
      state.selectedCategoryItems = [];
    },
    setSearchedItems(state, action) {
      state.searchedItems = action.payload;
    },
  },
});
export const HomeSlice = slice;
export const {
  getCategoriesFail,
  getCategoriesStart,
  getCategoriesSuccess,
  getProductsFail,
  getProductsStart,
  getProductsSuccess,
  getDetailsFail,
  getDetailsStart,
  getDetailsSuccess,
  getReviewsSuccess,
  getAllDealsFail,
  getAllDealsStart,
  getAllDealsSuccess,
  getNeedsFail,
  getNeedsStart,
  setSearchedItems,
  getNeedsSuccess,
  clearCategoryItems,
  getCategoryItemsSuccess,
} = slice.actions;
