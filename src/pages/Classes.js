import React from "react";
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Image,
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import axios from 'axios'
import Picker from 'react-native-picker'
import { loadData } from '../utils/LocalStorage'
import { getWeekClassTable } from '../utils/ClassLogics'

const Number = ['一','二','三','四','五','六','七','八','九','十','十一','十二','十三','十四','十五','十六','十七','十八','十九','二十','二一','二二','二三','二四','二五']
const Pin = ['pin0','pin1','pin2','pin3','pin4']

class Classes extends React.Component {
    state = {
        classes: [[],[],[],[],[],[],[]],
        week: null,
        currentWeek: null,
        monDate: null,
    }

    componentWillMount() {
        axios.get(baseUrl + "/time/week").then(response => {
            this.setState({
                currentWeek: response.data
            })
            this.state.week=response.data
            this.setMonDate(response.data,this.state.week)
            this.loadLessons()
        }).catch(err => console.log(err))
    }

    setMonDate(current_week, target_week){
        let date = new Date()
        let monDate=[]
        let delta = (target_week-current_week)*7-(date.getDay()+7-1)%7
        date.setDate(date.getDate()+delta)

        monDate.push(date)
        for (let i=1;i<7;i++){
            let tmp_date = new Date(date)
            tmp_date.setDate(date.getDate()+i)
            monDate.push(tmp_date)
        }

        this.setState({
            monDate: monDate
        })
    }

    timePick = () => {
        const range = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
        Picker.init({
            pickerTitleText:'上课周选择',
            pickerCancelBtnText:'取消',
            pickerConfirmBtnText:'确定',
            pickerData: range,
            selectedValue: [this.state.week],
            onPickerConfirm: data => {
                this.setState({
                    week: parseInt(data[0])
                })
                this.loadLessons()
            },
        });
        Picker.show();
    }

    loadLessons = () => {
        loadData({
            key:"lessons"
        }).then(data => {
            const {week} = this.state
            this.setState({
                classes: getWeekClassTable(data,week)
            })
            this.setMonDate(this.state.currentWeek,this.state.week)
        }).catch(err => {
            console.log(err)
        })
    }
    switchScreen = () => {
        this.props.navigation.navigate('Map')
    }

    render() {
        const {
            monDate,
            classes,
            week,
            currentWeek,
        } = this.state
        let currentDate=new Date()

        return (
            <View style={styles.container}>
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
                            <Text style={styles.switch_text}>地图模式</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={this.timePick}
                        style={[styles.header_title_container,styles.center]}
                    >
                        <Text style={styles.header_text}>
                            第{Number[this.state.week-1]}周
                        </Text>
                        <Image
                            style={styles.arrow_down_icon}
                            source={{uri:'arrow_down'}}
                        />
                    </TouchableOpacity>
                    <View style={styles.edit_container}>
                    </View>
                </View>
                <View style={styles.lessons_header_container}>
                    <Grid>
                        <Row>
                            <Col
                                style={styles.center}
                                size={1.6}
                            >
                                <Text style={styles.month}>{monDate != null?Number[monDate[0].getMonth()]:null}月</Text>
                            </Col>
                            <Col style={styles.center} size={2}>
                                <Text style={[styles.day,currentDate.getDay()==1 && week==currentWeek?styles.day_highlight:null]}>Mon</Text>
                                <Text style={styles.date}>{monDate != null?(monDate[0].getMonth()+1)+'.'+monDate[0].getDate():null}</Text>
                            </Col>
                            <Col style={styles.center} size={2}>
                                <Text style={[styles.day,currentDate.getDay()==2 && week==currentWeek?styles.day_highlight:null]}>Tue</Text>
                                <Text style={styles.date}>
                                    {monDate != null?(monDate[1].getMonth()+1)+'.'+(monDate[1].getDate()):null}
                                </Text>
                            </Col>
                            <Col style={styles.center} size={2}>
                                <Text style={[styles.day,currentDate.getDay()==3 && week==currentWeek?styles.day_highlight:null]}>Wed</Text>
                                <Text style={styles.date}>{monDate != null?(monDate[2].getMonth()+1)+'.'+(monDate[2].getDate()):null}</Text>
                            </Col>
                            <Col style={styles.center} size={2}>
                                <Text style={[styles.day,currentDate.getDay()==4 && week==currentWeek?styles.day_highlight:null]}>Thur</Text>
                                <Text style={styles.date}>{monDate != null?(monDate[3].getMonth()+1)+'.'+(monDate[3].getDate()):null}</Text>
                            </Col>
                            <Col style={styles.center} size={2}>
                                <Text style={[styles.day,currentDate.getDay()==5 && week==currentWeek?styles.day_highlight:null]}>Fri</Text>
                                <Text style={styles.date}>{monDate != null?(monDate[4].getMonth()+1)+'.'+(monDate[4].getDate()):null}</Text>
                            </Col>
                            <Col style={styles.center} size={2}>
                                <Text style={[styles.day,currentDate.getDay()==6 && week==currentWeek?styles.day_highlight:null]}>Sat</Text>
                                <Text style={styles.date}>{monDate != null?(monDate[5].getMonth()+1)+'.'+(monDate[5].getDate()):null}</Text>
                            </Col>
                            <Col style={styles.center} size={2}>
                                <Text style={[styles.day,currentDate.getDay()==0 && week==currentWeek?styles.day_highlight:null]}>Sun</Text>
                                <Text style={styles.date}>{monDate != null?(monDate[6].getMonth()+1)+'.'+(monDate[6].getDate()):null}</Text>
                            </Col>
                        </Row>
                    </Grid>
                </View>
                {
                    week == 17 || week == 18 ?
                        <View style={[styles.exam_container,styles.center]}>
                            <Image
                                style={styles.exam_img}
                                source={{uri:'exam'}}
                            />
                            <Text>考试周加油!</Text>
                        </View>
                        :
                        week > 18 ?
                            <View style={[styles.exam_container,styles.center]}>
                                <Image
                                    style={styles.exam_img}
                                    source={{uri:'holiday'}}
                                />
                                <Text>假期愉快!</Text>
                            </View>
                            :
                            <ScrollView>
                                <ImageBackground
                                    imageStyle={{resizeMode: 'stretch'}}
                                    style={styles.lessons_container}
                                    source={{uri:'lessons_bg'}}
                                >
                                    <Grid>
                                        <Col size={1.6}>
                                            <Row style={styles.center} size={1}><Text>1</Text></Row>
                                            <Row style={styles.center} size={1}><Text>2</Text></Row>
                                            <Row style={styles.center} size={1}><Text>3</Text></Row>
                                            <Row style={styles.center} size={1} ><Text>4</Text></Row>
                                            <Row style={styles.center} size={1} ><Text>5</Text></Row>
                                            <Row style={styles.center} size={1} ><Text>6</Text></Row>
                                            <Row style={styles.center} size={1} ><Text>7</Text></Row>
                                            <Row style={styles.center} size={1} ><Text>8</Text></Row>
                                            <Row style={styles.center} size={1} ><Text>9</Text></Row>
                                            <Row style={styles.center} size={1} ><Text>10</Text></Row>
                                            <Row style={styles.center} size={1} ><Text>11</Text></Row>
                                            <Row style={styles.center} size={1} ><Text>12</Text></Row>
                                            <Row style={styles.center} size={1} ><Text>13</Text></Row>
                                            <Row style={styles.center} size={1} ><Text>14</Text></Row>
                                            <Row style={styles.center} size={1} ><Text>15</Text></Row>
                                            <Row style={styles.center} size={1} ><Text>16</Text></Row>
                                        </Col>
                                        {
                                            classes.map((weekday,index) => {
                                                return (
                                                    <Col size={2} key={index} >
                                                        {classes[index].map((lesson, index) => {
                                                            return (
                                                                <Row size={lesson.span} key={index}>
                                                                    {
                                                                        lesson.name == null ? null :
                                                                            <ImageBackground
                                                                                imageStyle={{resizeMode: 'stretch'}}
                                                                                style={[styles.pin,styles.center]}
                                                                                source={{uri:Pin[lesson.hash]}}
                                                                            >
                                                                                <Text style={styles.text}>{lesson.name}</Text>
                                                                            </ImageBackground>
                                                                    }
                                                                </Row>
                                                            )
                                                        })}
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Grid>
                                </ImageBackground>
                            </ScrollView>
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        paddingTop: 20,
        backgroundColor: '#FFFFF6',
        flex:1,
    },
    header_container:{
        flexDirection: 'row',
        padding: 10,
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
    header_title_container:{
        flex:1,
        flexDirection: 'row',
    },
    arrow_down_icon:{
        width: 20,
        height: 20,
    },
    edit_container:{
        flex:1,
    },
    header_text:{
        fontSize: 17,
        color: '#000000',
        fontWeight: '400',
    },
    lessons_header_container:{
        height: 40,
    },
    month:{
        fontSize: 17,
        color: '#000000',
        fontFamily: '字魂95号-手刻宋'
    },
    day:{
        flex:1,
        fontFamily: 'citydmed',
        fontSize: 16,
    },
    day_highlight:{
        color: 'orange',
    },
    date:{
        flex:1,
        fontSize: 11,
    },
    exam_container:{
        flex:1,
    },
    lessons_container:{
        height: 760,
        marginBottom: 85,
    },
    exam_img:{
        height: 150,
        width: 150,
    },
    pin:{
        width: "95%",
        height: "100%",
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        paddingTop: 30,
        textAlign: 'center',
        fontSize: 10,
        lineHeight: 18,
    }
});

export default Classes