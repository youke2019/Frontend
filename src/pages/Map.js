import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { MapView, Marker } from 'react-native-amap3d'
import Picker from 'react-native-picker'
import { loadData } from '../utils/LocalStorage'
import { nextClass } from '../utils/ClassLogics'
import axios from 'axios'

const range = ['东上院','东中院1号楼','东中院2号楼','东中院3号楼','东中院4号楼','东下院','上院','中院','下院','包图','逸夫楼','工程馆']

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
    包图:{
        latitude: 31.021799786399136,
        longitude: 121.4300802438166
    },
    逸夫楼:{
        latitude: 31.025849791309042,
        longitude: 121.43513754882764
    },
    工程馆:{
        latitude: 31.200580288345485,
        longitude: 121.43379510323867
    },

}

class Map extends React.Component {
    state = {
        location: locations.上院,
        delay: true,
        building: '上院',
        schedule: [],
        week: -1,
        nextClass: null,
    }

    componentDidMount() {
        this.setState({
            delay: false,
        })
        loadData({
            key: 'lessons'
        }).then(data => {
            this.setState({ schedule: data })
        }).catch(err => console.log(err))
        axios({
            method: 'get',
            url: baseUrl + "/time/week"
        }).then((response => {
            this.setState({ week: response.data })
        })).catch(err => console.log(err))
    }
    componentDidUpdate (prevProps, prevState, snapshot) {
        if(prevState.week === -1 || prevState.schedule === null ){
            const nextClass = this.pickNextClass();
            if(nextClass != null)
                this.setState({
                    nextClass: nextClass,
                });
            const nextBuilding = this.pickNextBuilding(nextClass)
        }
    }

    pickNextClass = ()=>{
        let date = new Date();
        const time = {
            week:this.state.week,
            weekday:date.getDay().toString(),
            hour: date.getHours().toString(),
            minute : date.getMinutes().toString()
        }
        return nextClass(time, this.state.schedule);
    }
    pickNextBuilding=(nextClass)=>{

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
                <View>
                    <Text> 下一节课: </Text><Text> this.state.nextClass</Text>
                </View>
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