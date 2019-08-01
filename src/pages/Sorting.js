import React, { useState } from 'react'
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View, ScrollView, Image } from 'react-native'
import { connect } from 'react-redux'
import { clearSortlist, removeFromSortlist, updateSortlist } from '../redux/actions'
import { UnshadowedTitle } from '../components/UnshadowedTitle'
import Swipeout from 'react-native-swipeout'
import { arrange } from '../utils/arrangeDec'
import { Overlay } from 'react-native-elements'
import StackNavBar from '../components/StackNavBar'

const week = ['', '一', '二', '三', '四', '五', '六', '日']

const ChooseOverlay = (props) => {
  const { visible, course_info, onBackdropPress, onDeleteCourse } = props
  const classesChosen = {}
  course_info.classes.forEach(classItem => {
    classesChosen[classItem.classname] = classItem.chosen
  })
  let teachers = []
  let teachers_map = {}
  course_info.classes.map((item) => {
    if (teachers.some(t => t === item.teacher_name))
      teachers_map[item.teacher_name].push(item)
    else {
      teachers.push(item.teacher_name)
      teachers_map[item.teacher_name] = [item]
    }
  })
  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={onBackdropPress}
    >

      <ScrollView>
        <View style={overlay_styles.overlay_header}>
          <Text> 选择教学班 </Text>
          <TouchableOpacity
            onPress={() => {
              onBackdropPress()
              onDeleteCourse()
            }}
          >
            <Image source={{uri:'sort_delete'}} style={{width:20,height:20,}}/>
          </TouchableOpacity>
        </View>
        <View style={overlay_styles.container}>
          {
            teachers.map((teacher, index) => {
              const [class_visible, setVisible] = useState(false)
              const hasChosen = teachers_map[teacher].some(classItem => classItem.chosen)
              return <View key={index} style={overlay_styles.teacher_item}>
                <TouchableOpacity
                  style={overlay_styles.item_header}
                  onPress={() => setVisible(!class_visible)}
                >
                  <Text
                    style={hasChosen ? [overlay_styles.teacher_item_text, overlay_styles.teacher_item_text_chosen] : overlay_styles.teacher_item_text}> {teacher} </Text>
                </TouchableOpacity>
                {class_visible &&
                <View style={overlay_styles.item_body_container}>
                  {
                    teachers_map[teacher].map((classItem, index) => {
                      const chosen = classesChosen[classItem.classname]
                      let class_time = ''
                      classItem.classSegments.forEach((segment, index) => {
                        class_time = class_time.concat(segment.begin_week + '-' + segment.end_week + '周,'
                          + '周' + week[segment.week] + segment.begin_sec + '-' + segment.end_sec + '节')
                        if (index !== classItem.classSegments.length - 1) class_time += '\n'
                      })
                      return <TouchableOpacity
                        key={index}
                        style={chosen ? [overlay_styles.item_item, overlay_styles.item_item_chosen] : overlay_styles.item_item}
                        onPress={() => {
                          classesChosen[classItem.classname] = !chosen
                          props.onUpdate(classItem.classname, 'choose')
                        }}
                      >
                        <Text
                          style={chosen ? overlay_styles.item_item_text_chosen : overlay_styles.item_item_text}>
                          {class_time}
                        </Text>
                      </TouchableOpacity>
                    })
                  }
                </View>
                }
              </View>
            })
          }
        </View>
      </ScrollView>
    </Overlay>
  )
}

const overlay_styles = StyleSheet.create({
  overlay_header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  container: {
    alignItems: 'center',
    width: '100%'
  },
  teacher_item: {
    width: '100%'
  },
  teacher_item_text: {
    padding: 3,
    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: 'grey'
  },
  teacher_item_text_chosen: {
    backgroundColor: '#ffe8d9'
  },
  item_header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5
  },
  item_body_container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 10
  },
  item_item: {
    marginVertical: 5,
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
    backgroundColor: '#F8F8FF'
  },
  item_item_chosen: {
    backgroundColor: '#ffe8d9'
  },
  item_item_text: {
    lineHeight: 20,
  },
  item_item_text_chosen: {
    lineHeight: 20,
    color: '#ff961e'
  }

})

const CourseItem = (props) => {
  const [fold, setFold] = useState(false)
  const [choose, setChoose] = useState(false)
  const { course_info } = props
  return (
    <View style={course_styles.container}>
      <ChooseOverlay
        visible={choose}
        course_info={course_info}
        onBackdropPress={() => {setChoose(false)}}
        onDeleteCourse={() => {props.onDeleteCourse(course_info)}}
        onUpdate={(classname, method) => props.onUpdate(course_info, classname, method)}
      />
      <TouchableOpacity
        onPress={() => setFold(!fold)}
        onLongPress={() => props.onLongPress(course_info)}
        delayLongPress={500}
        activeOpacity={0.7}
      >
        <View
          style={course_info.isCompulsory ? [course_styles.course_card, course_styles.course_card_compulsory] : course_styles.course_card}>
          <View style={course_styles.course_card_title}>
            <Text> {course_info.course_name}</Text>
            <Text> {course_info.course_id}</Text>
          </View>
          <TouchableOpacity
            style={course_styles.course_card_choose}
            onPress={() => setChoose(!choose)}
          >
            <Image source={{ uri: 'sort_setting' }} style={{ width: 35, height: 35 }}/>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      {
        fold &&
        <View style={course_styles.classes_card}>
          <Text style={{ width: '100%', textAlign: 'center', fontWeight: 'bold' }}> 已选教学班 </Text>
          {
            course_info.classes.map((classItem, index) => {
                if (!classItem.chosen) return null
                const extra_teacher = classItem.teachers.split(';').length > 1
                let class_time = ''
                classItem.classSegments.forEach((segment, index) => {
                  class_time = class_time.concat(segment.begin_week + '-' + segment.end_week + '周,'
                    + '周' + week[segment.week] + segment.begin_sec + '-' + segment.end_sec + '节')
                  if (index !== classItem.classSegments.length - 1) class_time += '\n'
                })
                let swipeoutBtns = [{
                  text: '删除',
                  onPress: () => {props.onUpdate(course_info, classItem.classname, 'delete')}
                }]
                const hasPadding = true
                return (
                  <View style={{ width: '100%', paddingHorizontal: 20 }} key={index}>
                    <Swipeout right={swipeoutBtns} left={swipeoutBtns} backgroundColor={'default'}
                              style={{ width: '100%' }} autoClose>
                      <View style={course_styles.class_item}>
                        <UnshadowedTitle uri={'teacher'} title={'上课教师'} content={classItem.teacher_name}/>
                        {extra_teacher && <UnshadowedTitle uri={'teacher'} title={'合上教师'} content={classItem.teachers}/>}
                        <UnshadowedTitle uri={'clock'} title={'时间'} content={class_time}/>
                        <UnshadowedTitle uri={'location'} title={'教室'} content={classItem.classSegments[0].classroom}/>
                        <UnshadowedTitle uri={'student'} title={'选课人数'} content={classItem.course_participants}/>
                        {classItem.class_note !== '' &&
                        <UnshadowedTitle uri={'teacher'} title={'备注'} content={classItem.class_note}/>}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 4,
    backgroundColor: '#FFFFFF'
  },
  course_card_compulsory: {
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
  },
  course_card_title: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  course_card_choose: {
    position: 'absolute',
    right: 15
  },
  course_card_choose_text: {
    paddingHorizontal: 5,
    height: 30,
    backgroundColor: 'whitesmoke',
    borderRadius: 12.5,
    textAlign: 'center',
    textAlignVertical: 'center'
  }
})

class Sorting extends React.Component {
  static navigationOptions =  ({ navigation }) => ({
    header: () => {
      return (
        <StackNavBar
          navigation={navigation}
          title={"排课"}
        />
      )
    }
  })
  setCompulsory = (course_info) => {
    const isCompulsory = course_info.isCompulsory === true
    let new_course_info = course_info
    new_course_info.isCompulsory = !isCompulsory
    this.props.updateSortlist(new_course_info)
    /*
    const informText = isCompulsory ? '取消必选?' : '设为必选?'
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
          let new_course_info = course_info
          new_course_info.isCompulsory = !isCompulsory
          this.props.updateSortlist(new_course_info)
        }
      }],
      { cancelable: true }
    )*/
  }

  updateSortlist = (course_info, classname, action) => {
    let chosenClass = course_info.classes.find(classItem => classItem.classname === classname)
    if (action === 'delete')
      chosenClass.chosen = false
    if (action === 'choose')
      chosenClass.chosen = !(chosenClass.chosen === true)
    this.props.updateSortlist(course_info)
  }
  sort = () => {
    const { sortlist } = this.props
    const reducedList = sortlist.map(courseItem => {
      let reducedItem = Object.assign({}, courseItem)
      reducedItem.classes = []
      courseItem.classes.map(classItem => {
        if (classItem.chosen)
          reducedItem.classes.push(Object.assign({ course_name:courseItem.course_name }, classItem))
      })
      return reducedItem
    })
    let result = arrange(reducedList)
    this.props.navigation.navigate("SortClassesDisplay",{
      result: result
    })
  }

  render () {
    const { sortlist } = this.props
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <TouchableOpacity
          onPress={this.sort}
        >
          <View style={styles.sort_button}>
            <Text style={styles.sort_button_text}> 排 </Text>
          </View>
        </TouchableOpacity>
        <Text style={{ width: '100%', textAlign: 'center', lineHeight: 20 }}>长按标记课程必选，左右滑动删除不要的老师</Text>
        <FlatList
          data={sortlist}
          renderItem={({ item, index }) => {
            return <CourseItem
              course_info={item}
              key={index}
              onLongPress={this.setCompulsory}
              onUpdate={this.updateSortlist}
              onDeleteCourse={(course_info) => this.props.removeFromSortlist(course_info)}
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
    elevation: 1,
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