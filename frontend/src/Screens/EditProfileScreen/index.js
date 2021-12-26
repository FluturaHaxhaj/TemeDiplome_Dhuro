import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import Images from "../../Assets/Images";
import AuthActions from "../../Store/Auth/Actions";
import { useDispatch, useSelector } from "react-redux";
import { launchImageLibrary } from "react-native-image-picker";

const EditProfileScreen = () => {
  const dispatch = useDispatch();
  const [first_name, setName] = useState("");
  const [last_name, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone_number, setPhoneNumber] = useState("");

  const userData = useSelector((state) => state.Auth?.userData);
  const [image, setPhoto] = useState();

  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response) {
        setPhoto(response);
      }
    });
  };

  const navigation = useNavigation();
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
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          {image && (
            <>
              <Image
                style={{
                  backgroundColor: "white",
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                }}
                source={image ? { uri: image?.assets[0].uri } : Images.logo}
              />
            </>
          )}
          <Button title="Ngarko Foto" onPress={handleChoosePhoto} />
        </View>
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
            <Text style={styles.headerText}>Ndrysho profilin</Text>
          </View>
          <View style={styles.firstNameView}>
            <Text style={styles.firstNameText}>Emri</Text>
            <TextInput
              value={first_name}
              onChangeText={setName}
              keyboardType="default"
              style={styles.firstNameInput}
            />
          </View>
          <View style={styles.firstNameView}>
            <Text style={styles.firstNameText}>Mbiemri</Text>
            <TextInput
              value={last_name}
              onChangeText={setLastName}
              keyboardType="default"
              style={styles.firstNameInput}
            />
          </View>
          <View style={styles.firstNameView}>
            <Text style={styles.firstNameText}>Adresa</Text>
            <TextInput
              value={address}
              onChangeText={setAddress}
              keyboardType="default"
              style={styles.firstNameInput}
            />
          </View>
          <View style={styles.firstNameView}>
            <Text style={styles.firstNameText}>Telefoni</Text>
            <TextInput
              value={phone_number}
              onChangeText={setPhoneNumber}
              keyboardType="default"
              style={styles.firstNameInput}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            dispatch(
              AuthActions.updateUser(first_name, last_name, address, image)
            );
          }}
          style={styles.createAccountView}
        >
          <Text style={styles.createAccountText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfileScreen;

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
    fontSize: 10,
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
    marginTop: 28,
    height: 48,
    margin: 16,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  createAccountText: {
    fontSize: 14,
    color: "#ffffff",
  },
  headerText: {
    fontFamily: "Arial",
    fontSize: 20,
    fontWeight: "bold",
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
