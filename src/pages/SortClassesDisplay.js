import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image
} from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid'
import StackNavBar from '../components/StackNavBar'
import Picker from 'react-native-picker'

const Number = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '二一', '二二', '二三', '二四', '二五']
const Pin = ['pin0', 'pin1', 'pin2', 'pin3', 'pin4']
const OddEven = {
  'o': '(单)',
  'e': '(双)',
  'b': ''
}
class SortClassesDisplay extends React.Component {
  static navigationOptions =  ({ navigation }) => ({
    header: () => {
      return (
        <StackNavBar
          navigation={navigation}
          title={"排课结果"}
        />
      )
    }
  })
  state = {
    num:0,
    max: this.props.navigation.state.params.result.length - 1 > 15 ? 15 : this.props.navigation.state.params.result.length - 1,
  }

  componentWillMount (){
  }

  timePick = () => {
    let range = [];
    for(let i =1;i <= this.state.max + 1; i ++)
      range.push(i)
    Picker.init({
      pickerTitleText:'选择方案(最多显示前15条)',
      pickerCancelBtnText:'取消',
      pickerConfirmBtnText:'确定',
      pickerData: range,
      selectedValue: [this.state.num],
      onPickerConfirm: data => {
        this.setState({
          num: parseInt(data[0]) -1
        })
      },
    });
    Picker.show();
  }
  transResultToScheduleList = (result)=>{
    let weektable=[[],[],[],[],[],[],[]];
    result.forEach(classItem =>{
        classItem.classSegments.forEach(segment=>{
          segment.course_name = classItem.course_name
          segment.teacher_name = classItem.teacher_name
          weektable[segment.week - 1].push(segment)
      })
    })
    return weektable.map(item=>{
      let day = [];
      item.sort((lesson1,lesson2) => lesson1.begin_sec < lesson2.begin_sec ? -1 : 1)
      if(item.length > 0){
        let tmp = 0;
        let prevhash = -1
        item.forEach(seg=>{
          /* 下节课在上节课结束之前开始，说明是单双周的问题 */
          if(seg.begin_sec < tmp){
              let last = day[day.length - 1];
              /* TODO : 不能正确显示重叠课程的时间*/
              last.name = last.name + "\n" + seg.course_name + OddEven[seg.odd_or_even]
          }
          /* 下节课开始节次 比上节课结束节次要晚很多， 插入空挡 */
          if(seg.begin_sec - tmp > 1){
            day.push({
              span:seg.begin_sec - tmp -1,
              name:null,
            })
          }
          const name = seg.course_name
          day.push({
            span: seg.end_sec - seg.begin_sec + 1,
            name:name +"-"+ seg.teacher_name + OddEven[seg.odd_or_even],
            hash: (name.charCodeAt(1) - prevhash)*10000943 % 5
          })
          prevhash = day[day.length-1].hash
          tmp = seg.end_sec;
        })
        /*  如果还有额外的时间，填上空 */
        if(tmp < 16)
          day.push({name:null,span:16-tmp})
      }else{
        day.push({name:null,span:16})
      }
      return day
    })
  }
  render () {
    const {
      result,
    } = this.props.navigation.state.params
    const {num} = this.state;
    console.log("result",result)
    const classes = this.transResultToScheduleList(result[num]);
    console.log("schedule_0",classes)
    return (
      <View style={styles.container}>
        <View style={styles.header_container}>
          <View style={styles.switch_container}>
            <View
              style={[styles.switch,styles.center]}
            >
              <View
                style={styles.switch_icon}
              />
              <View style={styles.switch_text}/>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.header_title_container, styles.center]}
            onPress={this.timePick}
          >
            <Text style={styles.header_text}>
              方案{num}
            </Text>
            <Image
              style={styles.arrow_down_icon}
              source={{ uri: 'arrow_down' }}
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
                <Text style={styles.month}>月</Text>
              </Col>
              <Col style={styles.center} size={2}>
                <Text
                  style={styles.day}>Mon</Text>
              </Col>
              <Col style={styles.center} size={2}>
                <Text
                  style={styles.day}>Tue</Text>
              </Col>
              <Col style={styles.center} size={2}>
                <Text
                  style={styles.day}>Wed</Text>

              </Col>
              <Col style={styles.center} size={2}>
                <Text
                  style={styles.day}>Thur</Text>
              </Col>
              <Col style={styles.center} size={2}>
                <Text
                  style={styles.day}>Fri</Text>
              </Col>
              <Col style={styles.center} size={2}>
                <Text
                  style={styles.day}>Sat</Text>
              </Col>
              <Col style={styles.center} size={2}>
                <Text
                  style={styles.day}>Sun</Text>
              </Col>
            </Row>
          </Grid>
        </View>
        <ScrollView>
          <ImageBackground
            imageStyle={{ resizeMode: 'stretch' }}
            style={styles.lessons_container}
            source={{ uri: 'lessons_bg' }}
          >
            <Grid>
              <Col size={1.6}>
                <Row style={styles.center} size={1}><Text>1</Text></Row>
                <Row style={styles.center} size={1}><Text>2</Text></Row>
                <Row style={styles.center} size={1}><Text>3</Text></Row>
                <Row style={styles.center} size={1}><Text>4</Text></Row>
                <Row style={styles.center} size={1}><Text>5</Text></Row>
                <Row style={styles.center} size={1}><Text>6</Text></Row>
                <Row style={styles.center} size={1}><Text>7</Text></Row>
                <Row style={styles.center} size={1}><Text>8</Text></Row>
                <Row style={styles.center} size={1}><Text>9</Text></Row>
                <Row style={styles.center} size={1}><Text>10</Text></Row>
                <Row style={styles.center} size={1}><Text>11</Text></Row>
                <Row style={styles.center} size={1}><Text>12</Text></Row>
                <Row style={styles.center} size={1}><Text>13</Text></Row>
                <Row style={styles.center} size={1}><Text>14</Text></Row>
                <Row style={styles.center} size={1}><Text>15</Text></Row>
                <Row style={styles.center} size={1}><Text>16</Text></Row>
              </Col>
              {
                classes.map((weekday, index) => {
                  return (
                    <Col size={2} key={index}>
                      {classes[index].map((lesson, index) => {
                        return (
                          <Row size={lesson.span} key={index}>
                            {
                              lesson.name == null ? null :
                                <ImageBackground
                                  imageStyle={{ resizeMode: 'stretch' }}
                                  style={[styles.pin, styles.center]}
                                  source={{ uri: Pin[lesson.hash] }}
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFF6',
    flex: 1
  },
  header_container: {
    flexDirection: 'row',
    padding: 10
  },
  switch_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  switch: {
    paddingHorizontal: 16,
    borderRadius: 20,
    flexDirection: 'row'
  },
  switch_icon: {
    width: 14,
    height: 14
  },
  switch_text: {
    paddingLeft: 3,
    fontSize: 12
  },
  header_title_container: {
    flex: 1,
    flexDirection: 'row'
  },
  arrow_down_icon: {
    width: 20,
    height: 20
  },
  edit_container: {
    flex: 1
  },
  header_text: {
    fontSize: 17,
    color: '#000000',
    fontWeight: '400'
  },
  lessons_header_container: {
    height: 40
  },
  month: {
    fontSize: 17,
    color: '#000000',
    fontFamily: '字魂95号-手刻宋'
  },
  day: {
    flex: 1,
    fontFamily: 'citydmed',
    fontSize: 16
  },
  day_highlight: {
    color: 'orange'
  },
  date: {
    flex: 1,
    fontSize: 11
  },
  exam_container: {
    flex: 1
  },
  lessons_container: {
    height: 760,
    marginBottom: 85
  },
  exam_img: {
    height: 150,
    width: 150
  },
  pin: {
    width: '95%',
    height: '100%'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    paddingTop: 30,
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 18
  }
})

export default SortClassesDisplay