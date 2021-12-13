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

const ForgotPasswordScreen = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const navigation = useNavigation();
  const forgotPasswordHandler = () => {
    dispatch(HomeActions.forgotPassword(email));
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.mainView}>
        <Image
          style={{ width: 100, height: 100, alignSelf: "center" }}
          source={Images.logo}
        />
        <View style={styles.welcomeBackView}>
          <Text style={styles.welcomeBackText}>Forgot Password</Text>
        </View>

        <View style={styles.inputView}>
          <Text style={styles.inputText}>Email Address</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.textInput}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            forgotPasswordHandler;
            alert("Email Sent!");
          }}
          style={styles.loginView}
        >
          <Text style={styles.loginText}>Send Mail</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.registerView}
        >
          <Text style={styles.registerText}> Go back to login!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  mainView: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 24,
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 80,
  },

  welcomeBackView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 36,
    paddingBottom: 16,
  },
  welcomeBackText: {
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
