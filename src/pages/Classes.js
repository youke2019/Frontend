import React from "react";
import {View, StyleSheet, Text, ScrollView, TouchableOpacity} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import Picker from 'react-native-picker'


class Classes extends React.Component {
    state = {
        classes: [[],[],[],[],[],[],[]],
        week: 1
    }

    componentWillMount() {
        this.loadLessons()
    }

    timePick = () => {
        let range = [];
        for(var i=1;i<17;i++)
            range.push(i);

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
            onPickerCancel: data => {
                console.log(data);
            },
            onPickerSelect: data => {
                console.log(data);
            }
        });
        Picker.show();
    }

    loadLessons = () => {
        storage.load({
            key:'lessons',
            autoSync: false,
            syncInBackground: false,
        }).then(data => {
            console.log(data)
            this.setState({
                classes: [[],[],[],[],[],[],[]],
            })
            let new_classes=[]
            for (let lesson of data)
                for (let item of lesson.classes)
                    if (item.schedule.week == this.state.week)
                        this.state.classes[item.schedule.day - 1].push({
                            name:lesson.name,
                            period:item.schedule.period,
                        })

            for (let weekday of this.state.classes)
                weekday.sort((lesson1,lesson2) => lesson1.period < lesson2.period ? -1 : 1)


            for (let weekday of this.state.classes){
                let new_weekday = []
                let segment = {
                    name: null,
                    span: 1
                }
                let period = 0;
                for (let lesson of weekday){
                    if (segment.name != lesson.name){
                        if (lesson.period - period > 2)
                            new_weekday.push({
                                name:null,
                                span:lesson.period - (period + segment.span)
                            })
                        period = lesson.period
                        segment={
                            name:lesson.name,
                            span:1
                        }
                        new_weekday.push(segment)
                    } else {
                        segment.span++
                    }
                }

                if (period != 16)
                    new_weekday.push({
                        name:null,
                        span:17 - (period + segment.span)
                    })

                new_classes.push(new_weekday)
            }

            this.setState({
                classes: new_classes
            })
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <View>
                <View style={{ height: 50 }} style={styles.center}>
                    <TouchableOpacity onPress={this.timePick}>
                        <Text>
                            第{this.state.week}周
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 40 }}>
                    <Grid>
                        <Row>
                            <Col style={styles.center} size={1}><Text style={{ fontSize: 12 }}>九月</Text></Col>
                            <Col style={styles.center} size={2}><Text>周一</Text></Col>
                            <Col style={styles.center} size={2}><Text>周二</Text></Col>
                            <Col style={styles.center} size={2}><Text>周三</Text></Col>
                            <Col style={styles.center} size={2}><Text>周四</Text></Col>
                            <Col style={styles.center} size={2}><Text>周五</Text></Col>
                            <Col style={styles.center} size={2}><Text>周六</Text></Col>
                            <Col style={styles.center} size={2}><Text>周日</Text></Col>
                        </Row>
                    </Grid>
                </View>
                <ScrollView>
                    <View style={{ height: 960, marginBottom: 85, }}>
                        <Grid>
                            <Col size={1}>
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
                                this.state.classes.map((weekday,index) => {
                                    return (
                                        <Col
                                            size={2}
                                            key={index}
                                        >
                                            {this.state.classes[index].map((lesson, index) => {
                                                return (
                                                    <Row
                                                        size={lesson.span}
                                                        key={index}
                                                    >
                                                        {
                                                            lesson.name == null ? null :
                                                            <View style={styles.container}>
                                                                <Text style={styles.text}>{lesson.name}</Text>
                                                            </View>
                                                        }
                                                    </Row>
                                                )
                                            })}
                                        </Col>
                                    )
                                })
                            }
                        </Grid>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gainsboro',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 20,
    }
});

export default Classes