import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
const Map = () => {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 42.6629,
          longitude: 21.1655,
          latitudeDelta: 0.07,
          longitudeDelta: 0.07,
        }}
        style={{ flex: 1, borderRadius: 12 }}
      >
        <Marker coordinate={{ latitude: 42.6629, longitude: 21.1655 }} />
      </MapView>
    </View>
  );
};

export default Map;
