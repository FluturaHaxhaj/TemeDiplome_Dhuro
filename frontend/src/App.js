import React from "react";
import Store from "./Store";
import { Provider } from "react-redux";
import AppNavigator from "./Navigation/AppNavigator";
import ProductDetails from "./Screens/ProductDetailsScreen";

const App = () => {
  return (
    <Provider store={Store}>
      {/* <ProductDetails /> */}
      <AppNavigator />
    </Provider>
  );
};

export default App;
