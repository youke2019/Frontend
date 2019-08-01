import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native'
import { Image } from 'react-native-elements'
import { ShadowedTitle } from './ShadowedTitle'
import { UnshadowedTitle } from './UnshadowedTitle'
import { addToSortlist, removeFromSortlist } from '../redux/actions'
import { connect } from 'react-redux'

const ClassItem = (props) =>{
  const {class_info } = props;
  const extra_teacher = class_info.teachers.split(';').length > 1;
  return(
    <View style = {styles.class_item}>
      <UnshadowedTitle uri={'teacher'} title ={"上课教师"} content={class_info.teacher_name}/>
      { extra_teacher && <UnshadowedTitle uri={'teacher'} title ={"合上教师"} content={class_info.teachers}/> }
      <UnshadowedTitle uri={'clock'} title ={"学班"} content={class_info.classname}/>
      <UnshadowedTitle uri={'location'} title={"教室"} content={class_info.classSegments[0].classroom}/>
      <UnshadowedTitle uri={'student'} title ={"选课人数"} content={class_info.course_participants}/>
      {class_info.class_note ==="" ? null: <UnshadowedTitle uri={'teacher'} title ={"备注"} content={class_info.class_note}/>}
    </View>
  );
}

const mapStateToProps = (state) =>({
  sortlist:state.sortlist,
})

const mapDispatchToProps = dispatch =>({
    addToSortlist: (newItem)=>{
      dispatch(addToSortlist(newItem))
    },
    removeFromSortlist:(newItem)=> {
      dispatch(removeFromSortlist(newItem))
    }
})
class CourseDetail extends React.Component{
  state = {
    classesDetailVisible:false,
  }

  switchClassesDetailState = ()=>{
    this.setState({
      classesDetailVisible: !this.state.classesDetailVisible,
    })
  }

  onCollect = ()=>{
    const {course,sortlist} = this.props
    if(course === null) return ;
    if(sortlist.some((item)=> item.course_id === course.course_id)){
      this.props.removeFromSortlist(course)
    } else {
      this.props.addToSortlist(course)
    }
  }

  render(){
    const {course,sortlist} = this.props
    const {classesDetailVisible} = this.state
    const collected = sortlist.some((item)=> item.course_id === course.course_id) ? "collected" : "collect"
    let teachers = "";
    if(course.classes != null){
      course.classes.forEach((classItem)=>{
        if(teachers.indexOf(classItem.teacher_name) < 0) {
          teachers += classItem.teacher_name + ',';
        }
      });
      teachers = teachers.substring(0,teachers.length -1);
    }
    return(
      <View style = {styles.container}>
        <View style={styles.title_row}>
         <ShadowedTitle text={course.course_name} uri = {"course_name"} style = {styles.course_name}/>
          <TouchableOpacity
            onPress = {this.onCollect}
          >
            <Image source={{uri:collected}} style={{marginRight:20,width:25,height:25}}/>
          </TouchableOpacity>
        </View>
        <View style={styles.main_part}>
          <Image source={{uri:'cover_1' }} style ={styles.course_image}/>
          <View style = {styles.main_info}>
            <UnshadowedTitle uri={'teacher'} title ={"上课教师"} content={teachers}/>
            <UnshadowedTitle uri={'school'} title ={"开设学院"} content={course.course_deptname}/>
            <UnshadowedTitle uri={'course_id'} title ={"课号"} content={course.course_id}/>
            <UnshadowedTitle uri={'credit'} title ={"学分"} content={course.course_credits}/>
            <UnshadowedTitle uri={'student'} title ={"教学班数"} content={course.classes == null ? 0 :course.classes.length}/>
          </View>
        </View>
        {
          course.classes != null &&
          <View style = {styles.detail_button}>
            <TouchableOpacity
                style = {styles.detail_touchable}
                activeOpacity={0.3}
                onPress={this.switchClassesDetailState}
            >
              <Text
                  color = "white"
              > 教学班详情 </Text>
              <Image
                  style={styles.detail_enter_arrow}
                  source={{uri: classesDetailVisible? 'arrow_up':'arrow_down'}}
              />
            </TouchableOpacity>
          </View>
        }
        {
          classesDetailVisible &&
              <FlatList
                  data ={course.classes}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem ={
                    ({item})=>
                        <ClassItem
                            class_info={item}
                        />
                  }
              />
        }
      </View>
    )
  }
}
const styles = StyleSheet.create({
  class_item:{
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  detail_enter_arrow:{
    width:15,
    height:15,
    tintColor: 'gray'
  },
  detail_touchable:{
    padding: 8,
    flexDirection:'row',
    justifyContent:"flex-start",
    alignItems:'center',
  },
  detail_button:{
    width: '100%',
    paddingHorizontal: 12,
    paddingTop: 15,
    alignItems: 'flex-end',
  },
  course_image:{
    flex:1,
    marginHorizontal:10,
    width:130,
    maxHeight: 150,
    resizeMode:'cover',
    borderRadius: 6,
  },
  main_part:{
    marginHorizontal:15,
    marginTop:10,
    flexDirection:"row",
    alignItems:"center"
  },
  main_info:{
    flex:1,
    flexDirection:"column",
    justifyContent:"space-between"
  },
  course_name: {
  },
  container: {
    marginVertical: 16,
    alignItems: 'center',
  },
  course_name_img:{
    flex:1
  },
  title_row:{
    width:"100%",
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseDetail)