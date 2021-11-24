import { useIsFocused, useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import Images from "../../Assets/Images.js";
import Header from "../../Components/Header/index.js";
import HomeListHeader from "../../Components/HomeListHeader.js";
import Config from "../../Config.js";
import HomeActions from "../../Store/Home/Actions";
import * as HomeReducers from "../../Store/Home/Reducers";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const categories = useSelector((state) => state.Home.categories);
  const products = useSelector((state) => state.Home.products);
  const needs = useSelector((state) => state.Home.needs);
  const [search, setSearch] = useState("");
  const searchedItems = useSelector((state) => state.Home.searchedItems);
  const selectedCategoryItems = useSelector(
    (state) => state.Home.selectedCategoryItems
  );
  const [data, setData] = useState();
  const focused = useIsFocused();
  const [selected, setSelected] = useState("dhuro");
  useEffect(() => {
    dispatch(HomeActions.getProducts());
    dispatch(HomeActions.getAllNeeds());
    dispatch(HomeActions.getCategories());
    dispatch(HomeActions.getAverageReviews());
  }, [focused]);

  useEffect(() => {
    setTimeout(
      () =>
        dispatch(
          HomeActions.search(selected === "dhuro" ? "product" : "need", search)
        ),
      500
    );
  }, [search]);

  useEffect(() => {
    setData(products);
  }, []);

  // useEffect(() => {
  //   if (searchedItems?.length > 0) {
  //     setData(searchedItems);
  //   } else if (selectedCategoryItems.length > 0) {
  //     setData(selectedCategoryItems);
  //   } else {
  //     if (selected === "dhuro") {
  //       setData(products);
  //     } else {
  //       setData(needs);
  //     }
  //   }
  // }, [searchedItems, selectedCategoryItems, products, needs]);

  useEffect(() => {
    if (selected === "dhuro") {
      console.log({ Dhuro: selected });
      setData(products);
      if (selectedCategoryItems.length > 0) {
        console.log("aaa");
        setData(selectedCategoryItems);
      } else if (searchedItems?.length > 0) {
        setData(searchedItems);
      }
    } else {
      console.log({ Need: selected });
      setData(needs);
    }
  }, [selected, searchedItems, selectedCategoryItems, products, needs]);

  useEffect(() => {
    dispatch(HomeReducers.clearCategoryItems());
  }, [selected]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#A80005",
      }}
    >
      <FlatList
        style={{
          marginTop: 100,
          paddingTop: 40,
          paddingHorizontal: 16,
          flex: 1,
          backgroundColor: "white",
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}
        ListFooterComponent={
          <View
            style={{
              marginBottom: 50,
            }}
          />
        }
        data={data}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("details", {
                  id: item.id,
                  menu: false,
                  left: false,
                  prodNeed: selected === "dhuro" ? "product" : "need",
                })
              }
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
                    uri: `http://${item.pictures[0].title}`,
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
                    {item.product_name}
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
                        backgroundColor: "lightgreen",
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "400",
                        marginLeft: 5,
                      }}
                    >
                      {item.status.toUpperCase()}
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    textAlign: "left",
                  }}
                >
                  {item.description}
                </Text>
                <View
                  style={{
                    flexDirection: "column",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      textAlign: "left",
                    }}
                  >
                    Adresa:
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
                    {item.address}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        ListHeaderComponent={
          <HomeListHeader
            search={search}
            setSearch={setSearch}
            categories={categories}
            selected={selected}
            setSelected={setSelected}
          />
        }
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

export default HomeScreen;
