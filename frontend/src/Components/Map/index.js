import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";

const Map = () => {
  const details = useSelector((state) => state.Home.productDetails);
  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: details?.latitude,
          longitude: details?.longitude,
          latitudeDelta: 0.07,
          longitudeDelta: 0.07,
        }}
        style={{ flex: 1, borderRadius: 12 }}
      >
        <Marker
          coordinate={{
            latitude: details?.latitude,
            longitude: details?.longitude,
          }}
        />
      </MapView>
    </View>
  );
};

export default Map;
