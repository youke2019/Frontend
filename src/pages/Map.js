import React from "react";
import {Text, View, StyleSheet, Image, TouchableOpacity} from "react-native";
import { MapView, Marker } from 'react-native-amap3d'
import Picker from "react-native-picker";

const range = ['东上院','东中院1号楼','东中院2号楼','东中院3号楼','东中院4号楼','东下院','上院','中院','下院']

const locations = {
    上院:{
        longitude: 121.430988,
        latitude: 31.019374,
    },
    中院:{
        longitude: 121.431142,
        latitude: 31.020239,
    },
    下院:{
        longitude: 121.431101,
        latitude: 31.021138,
    },
    东上院:{
        longitude: 121.438050,
        latitude: 31.021610,
    },
    东中院1号楼:{
        longitude: 121.437408,
        latitude: 31.022571,
    },
    东中院2号楼:{
        longitude: 121.437352,
        latitude: 31.022860,
    },
    东中院3号楼:{
        longitude: 121.437301,
        latitude: 31.023200,
    },
    东中院4号楼:{
        longitude: 121.437126,
        latitude: 31.023536,
    },
    东下院:{
        longitude: 121.436710,
        latitude: 31.024200,
    },
}

class Map extends React.Component {
    state = {
        location: locations.上院,
        delay: true,
        building: '上院'
    }

    componentDidMount() {
        this.setState({
            delay: false
        })
    }

    buildingPick = () => {
        Picker.init({
            pickerTitleText:'上课地点选择',
            pickerCancelBtnText:'取消',
            pickerConfirmBtnText:'确定',
            pickerData: range,
            selectedValue: [this.state.building],
            onPickerConfirm: building => {
                let location = locations[building[0]]
                console.log(location)
                this.setState({
                    building: building[0],
                    location: location,
                })
            },
            onPickerCancel: data => {
                console.log(data);
            },
            onPickerSelect: data => {
                console.log(data);
            }
        });
        Picker.show();
    }

    render() {
        const state = this.state;
        return (
            <View style={{ flex: 1 }}>
                <MapView
                    style={styles.map}
                    region={{
                        longitude: state.location.longitude,
                        latitude: state.location.latitude,
                        longitudeDelta: 0.006,
                        latitudeDelta: 0.006,
                    }}
                    onPress={(event) => {
                        console.log(event.nativeEvent)
                    }}
                >
                    {
                        state.delay ? null :
                            <Marker
                                image="building"
                                coordinate={state.location}
                                style={styles.marker}
                            >
                                <View>
                                    <Text>{state.building}</Text>
                                </View>
                            </Marker>
                    }
                </MapView>
                <View style={{ flex: 1}} style={styles.center}>
                    <TouchableOpacity onPress={this.buildingPick}>
                        <Text style={styles.text}>
                            {state.building}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    center:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        textAlign : 'center',
        lineHeight: 40
    },
    map: {
        flex: 9
    },
    marker: {
        width: 40,
        height: 40,
    },
})

export default Map