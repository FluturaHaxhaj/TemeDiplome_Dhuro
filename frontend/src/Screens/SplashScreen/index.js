import React from "react";
import { View, Image } from "react-native";
import Images from "../../Assets/Images";

const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Image style={{ width: 300, height: 300 }} source={Images.logo} />
    </View>
  );
};

export default SplashScreen;
