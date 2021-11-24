import { useIsFocused } from "@react-navigation/core";
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Components/Header";
import HomeActions from "../../Store/Home/Actions";

const HelpScreen = () => {
  const dispatch = useDispatch();
  const deals = useSelector((state) => state.Home.deals.dealsWithImages);
  const focused = useIsFocused();
  useEffect(() => {
    dispatch(HomeActions.getAllDeals());
  }, [focused]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#A70003",
      }}
    >
      <FlatList
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingHorizontal: 16,
          paddingTop: 20,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          marginTop: 100,
        }}
        data={deals}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              // onPress={() => navigation.navigate("details", { id: item.id })}
              style={{
                width: "100%",
                borderWidth: 1,
                marginVertical: 10,
                borderColor: "#E0DEDE",
                padding: 16,
                borderRadius: 8,
                flexDirection: "row",
                shadowColor: "black",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.12,
                elevation: 17,
                shadowRadius: 16,
                backgroundColor: "white",
              }}
            >
              <View>
                <Image
                  style={{
                    width: 130,
                    height: 160,
                    borderRadius: 8,
                    resizeMode: "contain",
                  }}
                  source={{
                    uri: `http://${item.pictures[0].deal_img}`,
                  }}
                />
              </View>
              <View
                style={{
                  marginLeft: 20,
                  width: "50%",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "700",
                      textAlign: "left",
                    }}
                  >
                    {item.deal_name}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: item.deal_status
                          ? "red"
                          : "lightgreen",
                      }}
                    />
                  </View>
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    textAlign: "left",
                  }}
                >
                  {item.deal_description}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      textAlign: "left",
                    }}
                  >
                    Postuar nga:
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      fontSize: 16,
                      fontWeight: "400",
                      textAlign: "left",
                    }}
                  >
                    {item.dealer_name}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      textAlign: "left",
                    }}
                  >
                    Marrur nga:
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      fontSize: 16,
                      fontWeight: "400",
                      textAlign: "left",
                    }}
                  >
                    {item.deal_post_name}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 0,
          backgroundColor: "#A80005",
        }}
      >
        <Header />
      </View>
    </View>
  );
};

export default HelpScreen;
