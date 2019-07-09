import React from "react";
import {Text, View, StyleSheet} from "react-native";
import { MapView } from 'react-native-amap3d'

class Map extends React.Component {
    render() {
        return (
            <MapView
                style={styles.map}
                coordinate={{
                    latitude: 39.90980,
                    longitude: 116.37296,
                }}

            />
        );
    }
}

const styles = StyleSheet.create({
    map: {
        flex : 1,
    }
});

export default Map