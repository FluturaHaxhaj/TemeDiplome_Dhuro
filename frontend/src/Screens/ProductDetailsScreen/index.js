import { useIsFocused, useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Animated,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import Images from "../../Assets/Images";
import Header from "../../Components/Header";
import Map from "../../Components/Map";
import Config from "../../Config";
import HomeActions from "../../Store/Home/Actions";

const { width } = Dimensions.get("window");

const ProductDetails = () => {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.Home.productDetails);

  const [comment, setComment] = useState("");
  const route = useRoute();
  const focused = useIsFocused();
  const [prodId, setProdId] = useState(route.params?.id);
  const [prodNeed, setProdNeed] = useState(route.params?.prodNeed);
  useEffect(() => {
    setProdId(route.params?.id);
    setProdNeed(route.params?.prodNeed);
  }, [route.params]);

  useEffect(() => {
    dispatch(HomeActions.getProductDetails(prodId, prodNeed));
  }, [focused]);

  const commentHandler = () => {
    dispatch(HomeActions.createComment(details?.id, comment, prodId));
    setComment("");
  };

  const width = useWindowDimensions().width;
  const height = width * 0.6;

  const [active, setActive] = useState(0);

  const change = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== active) {
      setActive(slide);
    }
  };
  const data = [Images.book, Images.headerImage, Images.logo];
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: 53,
      }}
    >
      <ScrollView>
        {/* <FlatList
          data={data}
          pagingEnabled
          style={{
            maxHeight: 200,
          }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image
              style={{
                width,
                height: 200,
              }}
              source={{ uri: item.title }}
            />
          )}
          // data={details?.medias}
          horizontal
        /> */}

        <View>
          <ScrollView
            pagingEnabled
            horizontal
            onScroll={change}
            showHorizontalScrollIndicator={false}
            style={{ width, height }}
          >
            {details?.medias.map((image, index) => (
              <Image
                key={index}
                source={image ? { uri: `http://${image.title}` } : Images.logo}
                style={{ width, height, resizeMode: "cover" }}
              />
            ))}
          </ScrollView>
          <View style={styles.pagination}>
            {details?.medias.map((i, k) => (
              <Text key={k} style={k == active ? styles.activeDot : styles.dot}>
                •
              </Text>
            ))}
          </View>
        </View>

        <View
          style={{
            flex: 1,
            paddingHorizontal: 16,
            paddingTop: 16,
          }}
        >
          <View style={styles.section}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 18,
                  marginVertical: 10,
                }}
              >
                {details?.product_name}
              </Text>
              <TouchableOpacity
                onPress={() => dispatch(HomeActions.addDeal(details?.id))}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 12,
                  paddingHorizontal: 18,
                  borderRadius: 10,
                  borderColor: "#A80005",
                  backgroundColor: "#A80005",

                  borderWidth: 1,
                }}
              >
                <Text
                  style={{
                    color: "white",
                  }}
                >
                  Take
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontWeight: "400",
                fontSize: 18,
                marginVertical: 10,
              }}
            >
              {details?.description}
            </Text>
            <Text
              style={{
                fontWeight: "400",
                marginVertical: 10,

                fontSize: 18,
              }}
            >
              {details?.phone_number}
            </Text>
            <Text
              style={{
                fontWeight: "400",
                fontSize: 18,
                marginVertical: 10,
              }}
            >
              {details?.address}
            </Text>
          </View>
          <View
            style={{
              height: 200,
              marginTop: 20,
            }}
          >
            <Map />
          </View>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 18,
              marginVertical: 10,
            }}
          >
            Comments:
          </Text>
          <View
            style={{
              marginBottom: 20,
              marginTop: 5,
            }}
          >
            {details?.comments?.map((e, i) => (
              <View
                key={i}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 5,
                  borderBottomColor: "rgba(0,0,0,0.2)",
                  borderBottomWidth: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    marginRight: 10,
                    marginBottom: 5,
                  }}
                >
                  {e.first_name} :
                </Text>
                <Text>{e.comment}</Text>
              </View>
            ))}
          </View>
          <View
            style={{
              height: 48,
              backgroundColor: "#A80005",
              borderRadius: 16,
              padding: 8,
              paddingHorizontal: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextInput
              placeholder="Enter a comment"
              placeholderTextColor="#fff"
              value={comment}
              onChangeText={setComment}
              style={{
                width: "80%",
                color: "white",
              }}
            />
            <TouchableOpacity onPress={commentHandler}>
              <Text
                style={{
                  color: "white",
                }}
              >
                Post
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          top: 0,
          backgroundColor: "#A80005",
        }}
      >
        <Header />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: -15,
    alignSelf: "center",
  },
  dot: {
    color: "#888",
    fontSize: 50,
  },
  activeDot: {
    color: "#FFF",
    fontSize: 50,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    backgroundColor: "white",
  },
});

export default ProductDetails;
