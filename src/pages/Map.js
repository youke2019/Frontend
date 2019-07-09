import React from "react";
import {Text, View, StyleSheet} from "react-native";
import { MapView } from 'react-native-amap3d'

class Map extends React.Component {
    state = {
        location: {
            latitude:31.024602,
            longitude:121.434653,
        }
    }

    render() {
        return (
            <MapView
                style={styles.map}
                locationEnabled
                onLocation={({ nativeEvent }) =>
                {this.setState({
                    location: {
                        latitude:nativeEvent.latitude,
                        longitude:nativeEvent.longitude
                    }
                })}}
                region={{
                    latitude: this.state.location.latitude,
                    longitude: this.state.location.longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                }}

                locationInterval={10000}
                distanceFilter={10}
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