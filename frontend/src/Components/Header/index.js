import { useNavigation, useRoute } from "@react-navigation/core";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import Images from "../../Assets/Images";

const Header = ({ headerStyle, reviews, averageReview }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const menuState = route.params?.menu;
  const menuLeft = route.params?.left;

  return (
    <View style={{ ...Styles.mainView, ...headerStyle }}>
      <View>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            width: Dimensions.get("screen").width,
            paddingHorizontal: 16,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              menuState === false
                ? navigation.goBack()
                : navigation.toggleDrawer()
            }
          >
            {menuState === false ? (
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                }}
              >
                Back
              </Text>
            ) : (
              <Image
                style={{ width: 23, height: 23, tintColor: "#fff" }}
                source={Images.menuIcon}
              />
            )}
          </TouchableOpacity>
          <Text style={Styles.headerText}>DHURO</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("add", { menu: false, left: false })
            }
          >
            {(menuState === false && menuLeft === false) ||
            (menuState === true && menuLeft === false) ? null : reviews ? (
              <Text style={{ color: "white", fontSize: 18 }}>
                {parseFloat(averageReview).toFixed(1)}
              </Text>
            ) : (
              <Image
                style={{ width: 23, height: 23, tintColor: "#fff" }}
                source={Images.add}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;

const Styles = StyleSheet.create({
  mainView: {
    paddingTop: "7%",
    height: 100,
    width: Dimensions.get("screen").width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A80005",
  },
  headerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    alignSelf: "center",
    marginRight: 20,
  },
});
