import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator, { AuthNavigator, CustomDrawer } from "./MainNavigator";
import SplashScreen from "../Screens/SplashScreen";
import { StatusBar } from "react-native";
import { useSelector } from "react-redux";

const AppNavigator = () => {
  const [continueNext, setContinueNext] = useState(false);
  const isAuth = useSelector((state) => !!state.Auth.token);
  setTimeout(() => setContinueNext(true), 3000);
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      {isAuth && <CustomDrawer />}
      {continueNext && !isAuth ? (
        <AuthNavigator />
      ) : (
        !isAuth && <SplashScreen />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
