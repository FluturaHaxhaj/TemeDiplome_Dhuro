import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import FilterIcon from "../../Assets/Icons/FilterIcon";
import SearchIcon from "../../Assets/Icons/SearchIcon";
import Images from "../../Assets/Images";
import HomeActions from "../../Store/Home/Actions";

const HomeListHeader = ({
  search,
  setSearch,
  selected,
  setSelected,
  categories,
}) => {
  const dispatch = useDispatch();
  return (
    <View
      style={{
        marginBottom: 20,
      }}
    >
      <View style={Styles.mainView}>
        <Image style={Styles.headerImage} source={Images.book} />
        <View style={Styles.searchContainerView}>
          <View style={Styles.searchInputContainer}>
            <TextInput
              placeholder="Search"
              style={Styles.textInput}
              placeholderTextColor="#3D3B3B"
              value={search}
              onChangeText={setSearch}
            />
            <TouchableOpacity style={Styles.searchIconView}>
              <SearchIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={{
          marginTop: 30,
          marginHorizontal: -16,
          paddingHorizontal: 16,
        }}
        horizontal
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              dispatch(
                HomeActions.getItemsFromCategory(
                  selected === "dhuro" ? "product" : "need",
                  item.id
                )
              )
            }
            style={Styles.mainView2}
          >
            <Text style={Styles.textStyle}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          paddingTop: 30,
        }}
      >
        <TouchableOpacity onPress={() => setSelected("dhuro")}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "600",
              opacity: selected === "dhuro" ? 2 : 0.2,
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
              opacity: selected === "kerko" ? 2 : 0.2,
              color: "#A80005",
            }}
          >
            Kërko
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeListHeader;

const Styles = StyleSheet.create({
  mainView: { marginHorizontal: 17, marginTop: 0 },
  headerImage: {
    width: 320,
    height: 150,
    borderRadius: 16,
    alignSelf: "center",
  },
  searchContainerView: {
    padding: 16,
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginTop: -60,
    alignSelf: "center",
    width: 290,
    borderRadius: 16,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    elevation: 17,
    shadowRadius: 16,
  },
  searchContainerText: {
    color: "#141313",
    fontSize: 17,
  },
  searchInputContainer: {
    backgroundColor: "#F0F0F0",
    width: "100%",
    marginTop: 0,
    height: 40,
    borderRadius: 28,
    padding: 4,
    alignItems: "center",
    flexDirection: "row",
  },
  filterIconView: {
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  textInput: {
    fontSize: 14,
    color: "#3D3B3B",
    paddingHorizontal: 10,
    flex: 1,
  },
  searchIconView: {
    backgroundColor: "#A80005",
    paddingHorizontal: 13,
    paddingLeft: 10,
    paddingRight: 14,
    paddingVertical: 8,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  mainView2: {
    backgroundColor: "#A80005",
    borderColor: "#A80005",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 17,
    paddingVertical: 8,
    borderRadius: 28,
    borderWidth: 0.5,
    height: 40,
    marginRight: 12,
  },
  textStyle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
