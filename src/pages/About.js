import React from "react";
import {Image, StatusBar, StyleSheet, Text, View} from "react-native";
import {  loadSortlist, } from '../redux/actions'
import { connect } from 'react-redux'
import { loadData } from '../utils/LocalStorage'

export default class About extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: `关于我们`,
    });
    render() {
        return (
            <View style = { styles.info_container}>
                <Image source={require('../../public/images/logo-transparent.png')}  style={styles.logo} />
                <Text>      这一款app，旨在助力于课程信息流通，在打通闭塞的课程信息下，帮助同学们更好地选课。</Text>
                <Text>      19年5月，初夏，我们拿到了动态主题课程项目。适逢暑期学期降至，脑海中逐渐泛起每次被交大选课系统支配的恐惧，回想起每次选课时左右为难的纠结。做个选课功能助手吧，也算为后来人谋点福利。</Text>
                <Text>      在交大如今的选课系统下，学生对于课程信息的了解几乎局限于课程信息网及相近的熟人。每逢选课周，交大学子们需要花费很多时间来了解各种课程的信息。对于专业必修课，学生们需要专业课各老师的评价，老师的上课风格，给分详情是学生们选课的重要凭据；对于其他非专业必修课诸如通识课与任选课，课程其上课的详细内容，老师评分标准以及课程作业及考核的设置都很大程度上决定了学生是否选这门课。在选课时，很多学生了解的课程信息内容都很少，大部分时候只能低效的询问身边的同学获得信息。对于很多交大的精课，好课则只能通过身边人的推荐才能获知。在打通闭塞的课程信息下，有课能帮助同学们更好地选课。无论是想要的课程，想要的老师，我们这里都可以查到。</Text>
                <Text style={styles.right}>我们的团队 —— Yoke 有课</Text>
                <Text style={styles.right}>柳正威、赵旭阳、郭志、朱朝阳</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        paddingTop: 25,
    },
    info_container:{
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 36,
        paddingBottom: 20,
        paddingRight: 10,
        paddingLeft:  20,
    },
    info_content:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    info:{
        paddingLeft: 20,
        paddingBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    gender:{
        margin: 5,
        width: 13,
        height: 13,
    },
    insignia:{
        marginLeft: 20,
        width: 13,
        height: 13,
    },
    logo:{
        width:300,
        height:200,
        marginBottom:20
},
    list_container:{
        paddingTop:20,
        flexDirection: 'column',
    }
})

