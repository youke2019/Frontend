import React from "react";
import {
    Text,
    StyleSheet,
    View,
    Image
} from "react-native";

class SegmentCard extends React.Component {
    render() {
        const {
            segment={}
        } = this.props

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{segment.name}</Text>
                <View style={styles.elements}>
                    <View style={styles.element}>
                        <Image
                            style={styles.icon}
                            source={{uri:'map_location'}}
                        />
                        <Text>上课地点: {segment.classroom}</Text>
                    </View>
                    <View style={styles.element}>
                        <Image
                            style={styles.icon}
                            source={{uri:'map_time'}}
                        />
                        <Text>上课时间: {segment.time.start}~{segment.time.end}</Text>
                    </View>
                    <View style={styles.element}>
                        <Image
                            style={styles.icon}
                            source={{uri:'map_teacher'}}
                        />
                        <Text>上课教师: {segment.teachers.map((teacher) => {return(teacher.name+' ')})}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        margin: 10,
        padding: 15,
        height:170,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#FFFFF6'
    },
    title:{
        textAlign: 'center',
        fontSize: 20,
        fontFamily: '字魂17号-萌趣果冻体'
    },
    element:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    icon:{
        width: 21,
        height: 21,
    }
})

export default SegmentCard