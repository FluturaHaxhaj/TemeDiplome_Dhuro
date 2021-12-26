import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Components/Header";
import HomeActions from "../../Store/Home/Actions";

const ReviewsScreen = () => {
  const dispatch = useDispatch();
  const averageReview = useSelector((state) => state.Home.averageReview);
  const [rate, setRate] = useState();
  const [desc, setDesc] = useState("");

  const rateDone = (rate) => {
    setRate(rate);
  };

  const rateHandler = () => {
    dispatch(HomeActions.rateApp(rate, desc));
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#A80005",
      }}
    >
      <Header reviews averageReview={averageReview} />

      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          height: "100%",
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
        }}
      >
        <View
          style={{
            marginTop: -200,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: "500",
            }}
          >
            Si e vlerësoni aplikacionin tonë ?
          </Text>
        </View>
        <View
          style={{
            marginVertical: 20,
          }}
        >
          <AirbnbRating reviews={false} size={30} onFinishRating={rateDone} />
        </View>
        <View>
          <View style={styles.inputView}>
            <Text style={styles.inputText}>Desciption</Text>
            <TextInput
              value={desc}
              onChangeText={setDesc}
              style={styles.textInput}
            />
          </View>
          <View
            style={{
              width: 300,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={rateHandler}
              style={{
                marginTop: 10,
                height: 50,
                width: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#A80005",
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ReviewsScreen;

const styles = StyleSheet.create({
  inputView: {
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
});
