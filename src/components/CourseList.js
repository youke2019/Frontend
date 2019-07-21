import React from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import {Divider} from 'react-native-elements';
import {connect} from "react-redux";
import Detail from "../pages/Detail";

const mapStateToProps = state => {
    return {
        course_list: state.course_list
    }
}

class CourseList extends React.Component {
    onClick = (item) => {
      this.props.navigation.navigate('Detail', {
        course_id: item.course_id
      })
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.course_list}
                    renderItem={({item}) =>
                        <ImageBackground
                            style={styles.card_container}
                            imageStyle={{resizeMode: 'stretch'}}
                            source={{uri:'course_card'}}
                        >
                            <View style={styles.card}>
                                <View style={styles.header}>
                                    <Text style={styles.title}>{item.course_name}</Text>
                                    <TouchableOpacity
                                        style={styles.detail}
                                        onPress = {() => this.onClick(item)}
                                    >
                                        <View style={styles.detail_text_container}>
                                            <Text style={styles.detail_text}>详情查看</Text>
                                        </View>
                                        <Image
                                            style={styles.detail_enter_arrow}
                                            source={{uri:'right_arrow'}}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <Divider style={styles.divider} />
                                <View style={styles.content}>
                                    <View>
                                        <Image
                                            style={styles.course_image}
                                            source={{uri:'course'}}
                                        />
                                    </View>
                                    <View style={{ justifyContent: 'space-evenly'}}>
                                        <View style={styles.course_info}>
                                            <Image
                                                style={styles.icon}
                                                source={{uri:'course_id_search'}}
                                            />
                                            <Text>课程编号：{item.course_id}</Text>
                                        </View>
                                        <View style={styles.course_info}>
                                            <Image
                                                style={styles.icon}
                                                source={{uri:'course_credit'}}
                                                source={{uri:'course_credit'}}
                                            />
                                            <Text>学分：{item.course_credits}</Text>
                                        </View>
                                        <View style={styles.course_info}>
                                            <Image
                                                style={styles.icon}
                                                source={{uri:'general'}}
                                            />
                                            <Text>是否通识：{item.general?'是':'否'}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                    }
                    keyExtractor={(item) => item.course_id.toString()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 100,
    },
    card_container:{
        width:330,
        height:200,
        padding: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card:{
        width: 300,
        height: 160,
    },
    header:{
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title:{
        flex:3,
        fontSize: 18,
        paddingHorizontal:10,
        color: 'black',
        fontFamily: '字魂95号-手刻宋',
    },
    detail:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    detail_text_container:{
        justifyContent: 'center',
        alignItems:'flex-end'
    },
    detail_text:{
        fontSize: 12,
    },
    detail_enter_arrow:{
        width:17,
        height:17,
    },
    divider:{
        height: 1,
        backgroundColor: '#DCDCDC'
    },
    content:{
        flex: 3,
        flexDirection: 'row',
        padding:12,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    course_image:{
        width:80,
        height:80,
    },
    course_info:{
        flex:1,
        flexDirection: 'row',
        paddingLeft: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    icon:{
        width:24,
        height:24,
    },
})

export default connect(
    mapStateToProps
)(CourseList)