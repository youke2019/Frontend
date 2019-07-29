import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native'
import { MapView, Marker } from 'react-native-amap3d'
import { loadData } from '../utils/LocalStorage'
import axios from 'axios'
import Carousel from "react-native-snap-carousel";
import {
    getWeekClassTable,
    timeConvert,
    buildingConvert,
    nextClassIndex
} from "../utils/ClassLogics";
import SegmentCard from "../components/SegmentCard";

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
        latitude: 31.021800,
        longitude: 121.430080
    },
    逸夫楼:{
        latitude: 31.025850,
        longitude: 121.435138
    },
    工程馆:{
        latitude: 31.200580,
        longitude: 121.433795
    },
    未知:{
        latitude: 31.020256,
        longitude: 121.429380
    },
}

class Map extends React.Component {
    state = {
        location: locations.未知,
        delay: true,
        schedule: [],
        week: -1,
    }

    componentWillMount() {
        axios({
            method: 'get',
            url: baseUrl + "/time/week"
        }).then((response => {
            this.setState({ week: response.data })
            loadData({
                key: 'lessons'
            }).then(data => {
                this.scheduleProcess(data,response.data)
            }).catch(err => console.log(err))
        })).catch(err => console.log(err))
    }

    scheduleProcess = (data,week) => {
        let date = new Date()
        let schedule = getWeekClassTable(data,week)[0]
        let scheduleProcessed = []
        let timePeriod = 0
        for (let segment of schedule) {
            if (segment.name != null)
                scheduleProcessed.push(Object.assign({},segment,{time:timeConvert(timePeriod,segment.span)}))
            timePeriod += segment.span
        }
        this.setState({
            schedule: scheduleProcessed,
            delay: false,
        })
        if (scheduleProcessed.length)
            this.setState({
                location: locations[buildingConvert(scheduleProcessed[nextClassIndex(scheduleProcessed)].classroom)]
            })

    }

    onSnapToItem = (index) => {
        let location = locations[buildingConvert(this.state.schedule[index].classroom)]
        this.setState({
            location: location,
        })
    }

    isKnown = (location) => {
        if (location.latitude == 31.020256 && location.longitude == 121.429380)
            return false
        return true
    }

    switchScreen = () => {
        this.props.navigation.goBack()
    }

    _renderItem = ({item,index}) => {
        return (
            <SegmentCard
                segment={item}
            />
        )
    }

    render() {
        const {
            delay,
            location,
            schedule = []
        } = this.state;
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    showsZoomControls={false}
                    region={{
                        longitude: location.longitude,
                        latitude: location.latitude,
                        longitudeDelta: 0.004,
                        latitudeDelta: 0.004,
                    }}
                    onPress={(event) => {
                        console.log(event.nativeEvent)
                    }}
                >
                    {
                        delay ? null :
                            <Marker
                                image={this.isKnown(location) ? "marker":"unknown"}
                                coordinate={location}
                                style={styles.marker}
                            >
                                <View style={[styles.markerWindow,styles.center]}>
                                    <Text>上课地点</Text>
                                </View>
                            </Marker>
                    }
                </MapView>
                <View style={styles.header_container}>
                    <View style={styles.switch_container}>
                        <TouchableOpacity
                            style={[styles.switch,styles.center]}
                            onPress={this.switchScreen}
                        >
                            <Image
                                style={styles.switch_icon}
                                source={{uri:'switch_icon'}}
                            />
                            <Text style={styles.switch_text}>传统模式</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={styles.modal}
                >
                    {
                        schedule.length?
                            <Carousel
                                ref={(c) => { this._carousel = c; }}
                                data={schedule}
                                renderItem={this._renderItem}
                                sliderWidth={360}
                                itemWidth={260}
                                firstItem={nextClassIndex(schedule)}
                                layoutCardOffset={10}
                                onSnapToItem={this.onSnapToItem}
                            />
                            :
                            <View style={[styles.noClass_container,styles.center]}>
                                <Text style={styles.noCLass_text}>今日无课</Text>
                            </View>
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    header_container:{
        position: 'absolute',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingTop: 30,
    },
    switch_container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    switch:{
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#FDD32A',
        flexDirection: 'row',
    },
    switch_icon:{
        width: 14,
        height: 14,
    },
    switch_text:{
        paddingLeft: 3,
        fontSize: 12,
    },
    center:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        textAlign : 'center',
        lineHeight: 40
    },
    map: {
        flex: 6
    },
    marker: {
        width: 50,
        height: 50,
    },
    markerWindow:{
        width: 80,
        height: 20,
    },
    noClass_container:{
        borderRadius: 8,
        backgroundColor: '#FFFFF6',
        width: 260,
        height: 100,
        marginVertical: 10,
        marginHorizontal: 50,
    },
    noCLass_text:{
        fontFamily: '字魂17号-萌趣果冻体',
        fontSize: 27
    },
    modal:{
        position: 'absolute',
        backgroundColor: 'transparent',
        bottom: 12,
    }
})

export default Map