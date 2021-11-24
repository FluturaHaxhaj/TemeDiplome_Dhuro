import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Screens/HomeScreen";
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import ProductDetails from "../Screens/ProductDetailsScreen";
import AddScreen from "../Screens/AddScreen";
import * as HomeReducers from "../Store/Home/Reducers";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Image, Text, View } from "react-native";
import Images from "../Assets/Images";
import ReviewsScreen from "../Screens/ReviewsScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import EditProfileScreen from "../Screens/EditProfileScreen";
import ChangePasswordScreen from "../Screens/ChangePasswordScreen";
import AuthActions from "../Store/Auth/Actions";
import { useDispatch, useSelector } from "react-redux";
import HelpScreen from "../Screens/HelpScreen";
import ForgetPasswordScreen from "../Screens/ForgetPasswordScreen";

const defaultScreenOptions = {
  headerShown: false,
};

const MainStackNavigator = createStackNavigator();

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen
        name="Login"
        component={LoginScreen}
        options={defaultScreenOptions}
      />
      <AuthStackNavigator.Screen
        name="Register"
        component={RegisterScreen}
        options={defaultScreenOptions}
      />
      <AuthStackNavigator.Screen
        name="ForgotPassword"
        component={ForgetPasswordScreen}
        options={defaultScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};

export const MainNavigator = () => {
  return (
    <MainStackNavigator.Navigator>
      <MainStackNavigator.Screen
        name="home"
        component={HomeScreen}
        options={defaultScreenOptions}
      />
      <MainStackNavigator.Screen
        name="details"
        component={ProductDetails}
        options={defaultScreenOptions}
      />
      <MainStackNavigator.Screen
        name="add"
        component={AddScreen}
        options={defaultScreenOptions}
      />
    </MainStackNavigator.Navigator>
  );
};

const helpStack = createStackNavigator();

const HelpNavigator = () => {
  return (
    <helpStack.Navigator>
      <helpStack.Screen
        name="help"
        component={HelpScreen}
        options={defaultScreenOptions}
      />
      <MainStackNavigator.Screen
        name="details"
        component={ProductDetails}
        options={defaultScreenOptions}
      />
    </helpStack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }) => {
  const [activeRoute, setActiveRoute] = useState("Home");
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.Auth?.userData);
  const [user, setUser] = useState();
  useEffect(() => {
    setUser(userData);
  }, [user]);
  return (
    <DrawerContentScrollView
      scrollEnabled={true}
      contentContainerStyle={{ flex: 1, backgroundColor: "#fff" }}
      bounces={false}
    >
      <View
        style={{
          justifyContent: "flex-start",
          backgroundColor: "#fff",
          flex: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Edit");
            setActiveRoute("Edit");
          }}
          style={{
            alignSelf: "flex-end",
            marginRight: 20,
          }}
        >
          <Text
            style={{
              color: "#A80005",
              fontSize: 18,
              fontWeight: "500",
            }}
          >
            Edit
          </Text>
          {activeRoute === "Edit" && (
            <View
              style={{
                width: 20,
                borderWidth: 2,
                borderColor: "#A80005",
              }}
            />
          )}
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 30,
            flex: 0.3,
            backgroundColor: "#fff",
            borderBottomRightRadius: 30,
            zIndex: 100,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                width: 90,
                height: 90,
                borderRadius: 45,
                backgroundColor: "#fff",
              }}
              source={
                userData?.title
                  ? { uri: `http://${userData.title}` }
                  : Images.logo
              }
            />
            <Text
              style={{
                color: "#A80005",
                fontSize: 18,
                marginLeft: 15,
                fontWeight: "600",
              }}
            >
              {user?.first_name}
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingLeft: 30,
            paddingTop: 100,
            flex: 1,
            backgroundColor: "#A80005",
            zIndex: 50,
            marginTop: -40,
          }}
        >
          <View
            style={{
              flexGrow: 1,
              height: "70%",
              justifyContent: "flex-start",
            }}
          >
            <TouchableOpacity
              style={{
                marginVertical: 7,
              }}
              onPress={() => {
                {
                  navigation.navigate("Home");
                  setActiveRoute("Home");
                  dispatch(HomeReducers.clearCategoryItems());
                }
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: activeRoute === "Home" ? 18 : 16,
                  fontWeight: activeRoute === "Home" ? "600" : "400",
                }}
              >
                Home
              </Text>
              {activeRoute === "Home" && (
                <View
                  style={{
                    width: "15%",
                    borderWidth: 2,
                    borderColor: "#fff",
                  }}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginVertical: 7,
              }}
              onPress={() => {
                navigation.navigate("Ndihmesat", {
                  screen: "help",
                  params: { menu: true, left: false },
                });
                setActiveRoute("Ndihmesat");
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: activeRoute === "Ndihmesat" ? 18 : 16,
                  fontWeight: activeRoute === "Ndihmesat" ? "600" : "400",
                }}
              >
                Donations
              </Text>
              {activeRoute === "Ndihmesat" && (
                <View
                  style={{
                    width: "15%",
                    borderWidth: 2,
                    borderColor: "#fff",
                  }}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginVertical: 7,
              }}
              onPress={() => {
                navigation.navigate("Reviews");
                setActiveRoute("Reviews");
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: activeRoute === "Reviews" ? 18 : 16,
                  fontWeight: activeRoute === "Reviews" ? "600" : "400",
                }}
              >
                Reviews
              </Text>
              {activeRoute === "Reviews" && (
                <View
                  style={{
                    width: "15%",
                    borderWidth: 2,
                    borderColor: "#fff",
                  }}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginVertical: 7,
              }}
              onPress={() => {
                navigation.navigate("Settings");
                setActiveRoute("Settings");
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: activeRoute === "Settings" ? 18 : 16,
                  fontWeight: activeRoute === "Settings" ? "600" : "400",
                }}
              >
                Settings
              </Text>
              {activeRoute === "Settings" && (
                <View
                  style={{
                    width: "15%",
                    borderWidth: 2,
                    borderColor: "#fff",
                  }}
                />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => dispatch(AuthActions.logut())}
            style={{
              width: 200,
              height: 200,
              zIndex: 1000,
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "500",
                marginTop: -50,
              }}
            >
              Log out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export const CustomDrawer = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#A80005",
      }}
    >
      <Drawer.Navigator
        screenOptions={{
          ...defaultScreenOptions,
          overlayColor: "transparent",
          drawerType: "slide",
          sceneContainerStyle: {
            backgroundColor: "transparent",
          },

          drawerStyle: {
            flex: 1,
            width: "65%",
            paddingRight: 20,
            backgroundColor: "transparent",
          },
        }}
        drawerContent={(props) => {
          return <CustomDrawerContent navigation={props.navigation} />;
        }}
      >
        <Drawer.Screen name="Home" component={MainNavigator} />
        <Drawer.Screen name="Reviews" component={ReviewsScreen} />
        <Drawer.Screen name="Edit" component={EditProfileScreen} />
        <Drawer.Screen name="Ndihmesat" component={HelpNavigator} />
        <Drawer.Screen name="Settings" component={ChangePasswordScreen} />
      </Drawer.Navigator>
    </View>
  );
};

export default MainNavigator;
