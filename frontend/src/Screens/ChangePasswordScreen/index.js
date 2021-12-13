import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Images from "../../Assets/Images";
import { useDispatch } from "react-redux";
import HomeActions from "../../Store/Auth/Actions";

const ChangePasswordScreen = () => {
  const dispatch = useDispatch();
  const [pic, setpic] = useState();
  const [old_password, setOldPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");

  const navigation = useNavigation();
  const changePasswordHandler = () => {
    dispatch(
      HomeActions.changePassword(old_password, new_password, confirm_password)
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#A80005",
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 50,
          width: "100%",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          zIndex: 1000,
        }}
      >
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Image
            style={{ width: 23, height: 23, tintColor: "#fff" }}
            source={Images.menuIcon}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 0.3,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity>
          <Image
            style={{
              backgroundColor: "white",
              width: 100,
              height: 100,
              borderRadius: 50,
            }}
            source={
              pic ? { uri: `data:image/jpeg;base64,${pic}` } : Images.logo
            }
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: "white",
          flex: 0.7,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <View style={styles.inputsView}>
          <View style={styles.headerView}>
            <Text style={styles.headerText}>Ndrysho Fjalëkalimin</Text>
          </View>
          <View style={styles.firstNameView}>
            <Text style={styles.firstNameText}>Fjalekalimi i vjeter</Text>
            <TextInput
              value={old_password}
              onChangeText={setOldPassword}
              secureTextEntry={true}
              style={styles.firstNameInput}
            />
          </View>
          <View style={styles.firstNameView}>
            <Text style={styles.firstNameText}>Fjalekalimi i ri</Text>
            <TextInput
              value={new_password}
              onChangeText={setNewPassword}
              secureTextEntry={true}
              style={styles.firstNameInput}
            />
          </View>
          <View style={styles.firstNameView}>
            <Text style={styles.firstNameText}>Konfirmo Fjalekalimi</Text>
            <TextInput
              value={confirm_password}
              onChangeText={setConfirmPassword}
              secureTextEntry={true}
              style={styles.firstNameInput}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={changePasswordHandler}
          style={styles.createAccountView}
        >
          <Text style={styles.createAccountText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  inputsView: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "50%",
    marginTop: 50,
  },
  firstNameView: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#F5F6F7",
    width: "90%",
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DFE5EA",
    paddingTop: 5,
    paddingLeft: 15,
  },
  firstNameText: {
    fontSize: 11,
    color: "#949EA0",
  },
  firstNameInput: {
    color: "#334144",
    fontSize: 13,
    height: "70%",
  },
  createAccountView: {
    display: "flex",
    backgroundColor: "#A80005",
    marginTop: 18,
    height: 48,
    borderRadius: 16,
    margin: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  createAccountText: {
    fontSize: 14,
    color: "#ffffff",
  },
  headerText: {
    fontSize: 18,
    color: "#334144",
    fontWeight: "600",
  },
  headerView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 20,
  },
});
