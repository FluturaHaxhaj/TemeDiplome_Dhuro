import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import Images from "../../Assets/Images";
import HomeActions from "../../Store/Auth/Actions";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const loginHandler = () => {
    dispatch(HomeActions.login(email, password));
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.mainView}>
        <Image
          style={{ width: 100, height: 100, alignSelf: "center" }}
          source={Images.logo}
        />
        <View style={styles.welcomeBackView}>
          <Text style={styles.welcomeBackText}>Welcome</Text>
        </View>

        <View style={styles.inputView}>
          <Text style={styles.inputText}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputText}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            style={styles.textInput}
          />
        </View>
        <TouchableOpacity onPress={loginHandler} style={styles.loginView}>
          <Text style={styles.loginText}>Login to your Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={styles.registerView}
        >
          <Text style={styles.registerText2}>
            Don't have an account?
            <Text style={styles.registerText}> Register</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPassword")}
          style={styles.registerView}
        >
          <Text style={styles.registerText}>Forgot password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  dotsIosHeaderHolder: {
    marginRight: 23,
  },
  dotsIosImage: {
    width: 25,
    height: 5,
  },
  dotsHeaderHolder: {
    marginLeft: Platform.OS === "android" ? 22 : 11,
  },
  dotsImage: {
    width: 25,
    height: Platform.OS === "android" ? 5 : 25,
    tintColor: "#949EA0",
  },
  mainView: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 24,
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 80,
  },
  activityIndicatorView: {
    position: "absolute",
    top: 0,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: "#000000",
    opacity: 0.5,
    zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeBackView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 36,
    paddingBottom: 16,
  },
  welcomeBackText: {
    fontFamily: "Arial",
    fontSize: 20,
    fontWeight: "600",
    color: "#334144",
  },
  inputView: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#F5F6F7",
    marginTop: 16,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DFE5EA",
    paddingTop: 5,
    paddingLeft: 15,
  },
  inputText: {
    fontSize: 10,
    color: "#949EA0",
  },
  textInput: {
    color: "#334144",
    fontSize: 13,
    marginBottom: 7,
    height: "70%",
    marginBottom: 5,
  },
  loginView: {
    display: "flex",
    backgroundColor: "#A80005",
    marginTop: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontSize: 14,
    color: "#ffffff",
  },
  registerView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 28,
  },
  registerText2: {
    color: "#000",
    fontSize: 13,
  },
  registerText: {
    color: "#A80005",
    fontSize: 13,
  },
});
