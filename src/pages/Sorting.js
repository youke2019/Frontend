import React, { useState } from 'react'
import { Image, Text, View, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import { addToSortlist, clearSortlist, removeFromSortlist, updateSortlist } from '../redux/actions'
import { UnshadowedTitle } from '../components/UnshadowedTitle'
import Swipeout from 'react-native-swipeout'
import { arrange } from '../utils/arrangeDec'

const week = ['', '一', '二', '三', '四', '五', '六', '日']
const CourseItem = (props) => {
  const [fold, setFold] = useState(false)
  const { course_info } = props
  return (
    <View style={course_styles.container}>
      <TouchableOpacity
        onPress={() => setFold(!fold)}
        onLongPress={() => props.onLongPress(course_info)}
        delayLongPress={500}
        activeOpacity={0.7}
      >
        <View style={ course_info.isCompulsory ? [course_styles.course_card,course_styles.course_card_compulsory] : course_styles.course_card}>
          <Text> {course_info.course_name}</Text>
          <Text> {course_info.course_id}</Text>
        </View>
      </TouchableOpacity>
      {
        fold &&
        <View style={course_styles.classes_card}>
          <Text style={{ width: '100%', textAlign: 'center' }}> 备选教学班 </Text>
          {
            course_info.classes.map((class_info, index) => {
                if (class_info.delete === true) return <View key={index}/>
                const extra_teacher = class_info.teachers.split(';').length > 1
                let class_time = ''
                class_info.classSegments.forEach((segment,index) => {
                  class_time = class_time.concat(segment.begin_week + '-' + segment.end_week + '周,'
                    + '周' + week[segment.week] + segment.begin_sec + '-' + segment.end_sec + '节')
                  if(index !== class_info.classSegments.length) class_time += "\n"
                })
                let swipeoutBtns = [{
                  text: '删除',
                  onPress: () => {props.onUpdate(course_info, class_info.classname, 'delete')}
                }]
                const hasPadding = true
                return (
                  <View style={{ width: '100%', paddingHorizontal: 20 }} key={index}>
                    <Swipeout right={swipeoutBtns} left={swipeoutBtns} backgroundColor={'default'}
                      style={{ width: '100%' }} autoClose>
                      <View style={course_styles.class_item}>
                        <UnshadowedTitle uri={'teacher'} title={'上课教师'} content={class_info.teacher_name}/>
                        {extra_teacher && <UnshadowedTitle uri={'teacher'} title={'合上教师'} content={class_info.teachers}/>}
                        <UnshadowedTitle uri={'clock'} title={'时间'} content={class_time}/>
                        <UnshadowedTitle uri={'location'} title={'教室'} content={class_info.classSegments[0].classroom}/>
                        <UnshadowedTitle uri={'student'} title={'选课人数'} content={class_info.course_participants}/>
                        {class_info.class_note !== '' &&
                        <UnshadowedTitle uri={'teacher'} title={'备注'} content={class_info.class_note}/>}
                      </View>
                    </Swipeout>
                    {hasPadding && <View style={course_styles.padding}/>}
                  </View>
                )
              }
            )
          }
        </View>
      }
    </View>
  )
}
const course_styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    paddingVertical: 10
  },
  course_card: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 4,
    backgroundColor: '#FFFFFF'
  },
  course_card_compulsory:{
    backgroundColor: '#FDD32A'
  },
  classes_card: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginHorizontal: 20,
    elevation: 1,
    paddingTop: 5,
    paddingBottom: 10
  },
  class_item: {
    paddingHorizontal: 30
  },
  padding: {
    marginVertical: 4,
    borderBottomWidth: 1,
    borderColor: 'lightgrey'
  }
})

class Sorting extends React.Component {
  setCompulsory = (course_info) => {
    const isCompulsory = course_info.isCompulsory === true;
    const informText = isCompulsory ? "取消必选?" : "设为必选?"
    Alert.alert(
      '提示',
      informText,
      [{
        text: '取消',
        onPress: () => {},
        style: 'cancel'
      }, {
        text: '确定',
        onPress: () => {
          let new_course_info = course_info;
          new_course_info.isCompulsory = !isCompulsory;
          this.props.updateSortlist(new_course_info);
        }
      }],
      { cancelable: true }
    )
  }

  removeFromSortlist = (course_info) => {
    Alert.alert(
      '提示',
      '移除该课程?',
      [{
        text: '取消',
        onPress: () => {},
        style: 'cancel'
      }, {
        text: '确定',
        onPress: () => {
          console.log('remove', course_info)
          this.props.removeFromSortlist(course_info)
        }
      }],
      { cancelable: true }
    )
  }
  updateSortlist = (course_info, classname, action) => {
    let new_course_info = course_info
    if (action === 'delete') {
      new_course_info.classes = course_info.classes.map(classItem => {
        if (classItem.classname === classname)
          return Object.assign({}, classItem, { delete: true })
        else return classItem
      })
      if (new_course_info.deleteNum > 0) new_course_info.deleteNum++
      else new_course_info.deleteNum = 1
      console.log(new_course_info)
      if (new_course_info.deleteNum === new_course_info.classes.length) {
        this.props.removeFromSortlist(new_course_info)
        return
      }
    }
    this.props.updateSortlist(new_course_info)
  }
  sort =() =>{
    const {sortlist} = this.props;
    console.log(sortlist);
    const reducedList = sortlist.map(item=>{
      let reducedItem = Object.assign({},item)
      reducedItem.classes =[];
      item.classes.map(segment =>{
        if(!segment.delete)
          reducedItem.classes.push(Object.assign({}, segment))
      })
      return reducedItem;
    })
    console.log(reducedList);
    let result = arrange(reducedList);
    console.log(result)
  }
  render () {
    const { sortlist } = this.props
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', paddingTop: 30 }}>
        <TouchableOpacity
          onPress={this.sort}
        >
          <View style={styles.sort_button}>
            <Text style={styles.sort_button_text}> 排 </Text>
          </View>
        </TouchableOpacity>
        <Text style={{width:'100%',textAlign:'center',lineHeight:20,}}>长按标记课程必选，左右滑动删除不要的老师</Text>
        <FlatList
          data={sortlist}
          renderItem={({ item, index }) => {
            return <CourseItem
              course_info={item}
              key={index}
              onLongPress={this.setCompulsory}
              onUpdate={this.updateSortlist}
            />
          }}
          style={{ width: '100%' }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%'
  },
  sort_button: {
    height: 50,
    width: 50,
    borderRadius: 25,
    elevation:1,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sort_button_text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center'
  }
})
const mapStateToProps = state => {
  return {
    sortlist: state.sortlist
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeFromSortlist: (newItem) => {
      dispatch(removeFromSortlist(newItem))
    },
    updateSortlist: (newItem) => {
      dispatch(updateSortlist(newItem))
    },
    clearSortlist: () => {
      dispatch(clearSortlist())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sorting)