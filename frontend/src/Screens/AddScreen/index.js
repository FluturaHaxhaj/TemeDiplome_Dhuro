import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Button,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import * as ImagePicker from "react-native-image-picker";

import { useDispatch, useSelector } from "react-redux";
import Header from "../../Components/Header";
const { width, height } = Dimensions.get("screen");
import HomeActions from "../../Store/Home/Actions";
import Images from "../../Assets/Images";
import { SafeAreaView } from "react-native-safe-area-context";

const AddScreen = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.Home.categories);
  const [selectedCategoryDhuro, setSelectedCategoryDhuro] = useState();
  const [selected, setSelected] = useState("dhuro");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [address, setAddress] = useState("");
  const [images, setpic] = useState([]);

  const openGallery = React.useCallback(() => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: "photo",
        maxHeight: 100,
        maxWidth: 100,
        selectionLimit: 0,
      },
      (response) => {
        if (response.assets) {
          response.assets
            .slice(0, 3)
            .map((e) => setpic((prev) => [...prev, e]));
        }
      }
    );
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#A80005" }}>
      {/* <KeyboardAvoidingView behavior="position"> */}
      <ScrollView onScrollBeginDrag={Keyboard.dismiss}>
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              zIndex: 1000,
            }}
          >
            <Header />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              paddingVertical: 30,
            }}
          >
            <TouchableOpacity onPress={() => setSelected("dhuro")}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "600",
                  opacity: selected === "dhuro" ? 1 : 0.2,
                  color: "#A80005",
                }}
              >
                Dhuro
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelected("kerko")}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "600",
                  opacity: selected === "kerko" ? 1 : 0.2,
                  color: "#A80005",
                }}
              >
                Kërko
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width,
            }}
          >
            <View
              style={{
                paddingHorizontal: 10,
                flexWrap: "wrap",
                flexDirection: "row",
              }}
            >
              {categories.map((e, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    style={{
                      padding: 8,
                      margin: 6,
                      backgroundColor:
                        selectedCategoryDhuro === e.id ? "#A80005" : "#fff",
                      borderColor: "#A80005",
                      borderWidth: 1,
                      borderRadius: 20,
                      marginLeft: 12,
                      marginRight: 12,
                    }}
                    onPress={() => {
                      setSelectedCategoryDhuro(e.id);
                    }}
                  >
                    <Text
                      style={{
                        color:
                          selectedCategoryDhuro === e.id ? "#fff" : "#A80005",
                      }}
                    >
                      {e.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={styles.firstNameView}>
                <Text style={styles.firstNameText}>Emri</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  keyboardType="default"
                  style={styles.firstNameInput}
                />
              </View>
              <View style={styles.textArea}>
                <Text style={styles.firstNameText}>Pershkrimi</Text>
                <TextInput
                  value={desc}
                  onChangeText={setDesc}
                  keyboardType="default"
                  style={styles.firstNameInput}
                  multiline={true}
                  numberOfLines={4}
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
              <View
                style={{
                  width: "90%",
                  marginTop: 20,
                }}
              >
                {/* <TouchableOpacity onPress={openGallery}>
              <Text>Select Imagesssssss</Text> */}
                <Button
                  title="Choose Photo"
                  style={{ color: "#A80005" }}
                  onPress={openGallery}
                />
                {/* </TouchableOpacity> */}
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-evenly",
                    marginTop: 20,
                  }}
                >
                  {images.slice(0, 3).map((e, i) => (
                    <Image
                      key={i}
                      style={{
                        height: 100,
                        width: 100,
                        marginBottom: 10,
                      }}
                      source={{ uri: `${e.uri}` }}
                    />
                  ))}
                </View>
              </View>

              <TouchableOpacity
                onPress={() => {
                  selected === "dhuro"
                    ? dispatch(
                        HomeActions.createProduct(
                          images,
                          name,
                          address,
                          selectedCategoryDhuro,
                          desc
                        )
                      )
                    : dispatch(
                        HomeActions.createNeed(
                          images,
                          name,
                          address,
                          selectedCategoryDhuro,
                          desc
                        )
                      );
                  alert("U postua");
                }}
                style={{
                  marginTop: 50,
                  height: 48,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#A80005",
                  width: "90%",
                  borderRadius: 16,
                  marginBottom: 50,
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "600",
                    color: "white",
                  }}
                >
                  {selected === "dhuro" ? "Dhuro" : "Kerko"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
};

export default AddScreen;
const styles = StyleSheet.create({
  inputsView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mainView: {
    flexDirection: "column",
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },
  textAreaContainer: {
    borderColor: "#DFE5EA",
    borderWidth: 1,
    padding: 5,
  },
  textArea: {
    height: 100,
    flexDirection: "column",
    backgroundColor: "#F5F6F7",
    width: "90%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DFE5EA",
    paddingTop: 5,
    paddingLeft: 15,
    marginTop: 25,
  },
  firstNameView: {
    flexDirection: "column",
    backgroundColor: "#F5F6F7",
    width: "90%",
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DFE5EA",
    paddingTop: 5,
    paddingLeft: 15,
    marginTop: 25,
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
  welcomeBackView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 16,
  },
  welcomeBackText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#334144",
  },
});
