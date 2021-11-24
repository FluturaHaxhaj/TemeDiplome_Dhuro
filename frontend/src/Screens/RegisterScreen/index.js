import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Dimensions,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import Images from "../../Assets/Images";
import HomeActions from "../../Store/Auth/Actions";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tel, setTel] = useState("");
  const [address, setAddress] = useState("");
  const navigation = useNavigation();
  const registerHandler = () => {
    dispatch(
      HomeActions.register(
        email,
        address,
        password,
        confirmPassword,
        firstName,
        lastName,
        tel
      )
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView behavior="position" style={styles.mainView}>
        <ScrollView onScrollBeginDrag={Keyboard.dismiss}>
          <Image
            style={{ width: 100, height: 100, alignSelf: "center" }}
            source={Images.logo}
          />
          <View style={styles.headerView}>
            <Text style={styles.headerText}>Create an Account</Text>
          </View>
          <View style={styles.inputsView}>
            <View style={styles.firstNameView}>
              <Text style={styles.firstNameText}>First Name</Text>
              <TextInput
                keyboardType="default"
                value={firstName}
                onChangeText={setFirstName}
                style={styles.firstNameInput}
              />
            </View>
            <View style={styles.firstNameView}>
              <Text style={styles.firstNameText}>Last Name</Text>
              <TextInput
                value={lastName}
                onChangeText={setLastName}
                keyboardType="default"
                style={styles.firstNameInput}
              />
            </View>
          </View>

          <View style={styles.dateView}>
            <Text style={styles.firstNameText}>Email Address</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              style={styles.firstNameInput}
            />
          </View>
          <View style={styles.dateView}>
            <Text style={styles.firstNameText}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              style={styles.firstNameInput}
            />
          </View>
          <View style={styles.dateView}>
            <Text style={styles.firstNameText}>Confirm Password</Text>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={true}
              style={styles.firstNameInput}
            />
          </View>
          <View style={styles.dateView}>
            <Text style={styles.firstNameText}>Address</Text>
            <TextInput
              value={address}
              onChangeText={setAddress}
              keyboardType="default"
              style={styles.firstNameInput}
            />
          </View>
          <View style={styles.dateView}>
            <Text style={styles.firstNameText}>Phone Number</Text>
            <TextInput
              value={tel}
              onChangeText={setTel}
              keyboardType="number-pad"
              style={styles.firstNameInput}
            />
          </View>

          <TouchableOpacity
            onPress={registerHandler}
            style={styles.createAccountView}
          >
            <Text style={styles.createAccountText}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.dontRegisterView}
          >
            <Text style={styles.dontRegisterText}>
              I don’t want to register
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  mainView: {
    flexDirection: "column",
    paddingHorizontal: 24,
    backgroundColor: "#fff",
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
  headerView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 20,
    color: "#334144",
    fontWeight: "600",
  },
  inputsView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  firstNameView: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#F5F6F7",
    width: 152,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DFE5EA",
    paddingTop: 5,
    paddingLeft: 15,
  },
  firstNameText: {
    fontSize: 10,
    color: "#949EA0",
  },
  firstNameInput: {
    color: "#334144",
    fontSize: 13,
    height: "70%",
  },
  dateView: {
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
  createAccountView: {
    display: "flex",
    backgroundColor: "#A80005",
    marginTop: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  createAccountText: {
    fontSize: 14,
    color: "#ffffff",
  },
  dontRegisterView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 28,
  },
  dontRegisterText: {
    color: "#A80005",
    fontSize: 13,
  },
});
