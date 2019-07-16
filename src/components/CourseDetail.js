import React from 'react'
import { StyleSheet, Text, View,Button,FlatList ,TouchableOpacity} from 'react-native'
import { Image, Overlay } from 'react-native-elements'
import { ShadowedTitle } from './ShadowedTitle'
import { UnshadowedTitle } from './UnshadowedTitle'

const ClassItem = (props) =>{
  const {class_info } = props;
  const extra_teacher = class_info.teachers.split(';').length > 1;

  return(
    <View style = {styles.class_item}>
      <UnshadowedTitle uri={'teacher'} title ={"上课教师"} content={class_info.teacher_name}/>
      { extra_teacher && <UnshadowedTitle uri={'teacher'} title ={"合上教师"} content={class_info.teachers}/> }
      <UnshadowedTitle uri={'clock'} title ={"学期"} content={class_info.classname}/>
      <UnshadowedTitle uri={'location'} title={"教室"} content={class_info.classSegments[0].classroom}/>
      <UnshadowedTitle uri={'student'} title ={"选课人数"} content={class_info.course_participants}/>
      <UnshadowedTitle uri={'teacher'} title ={"备注"} content={class_info.class_note}/>
    </View>
  );
}
const ClassesDetail = (props) =>{
  const {
    visible = false,
    onBackdropPress = ()=>{},
    classes = [],
  } = props;

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={onBackdropPress}
    >
      <View>
        <FlatList
          data ={classes}
          renderItem ={
            ({item,index})=>{
            return <ClassItem class_info={item} key={index} />}
          }
          keyExtractor = { ({index})=>index }
        />
      </View>
    </Overlay>
  );
}

export default class CourseDetail extends React.Component{
  state = {
    classesDetailVisible:false,
  }
  openClassesDetail = ()=>{
    console.log("open")
    this.setState({
      classesDetailVisible:true,
    })
  }
  closeClassesDetail = () =>{
    this.setState({
      classesDetailVisible:false,
    })
  }
  render(){
    const {course} = this.props;
    let teachers = "";
    if(course.classes != null){
      course.classes.forEach((classItem)=>{
        if(teachers.indexOf(classItem.teacher_name) < 0) {
          teachers += classItem.teacher_name + ',';
        }
      });
      teachers = teachers.substring(0,teachers.length -1);
    }
    console.log(course)
    return(
      <View style = {styles.container}>
        <ShadowedTitle text={course.course_name} uri = {"course_name"}style = {styles.course_name}/>
        <View style={styles.main_part}>
          <Image source={{uri:'cover_' + Math.floor(Math.random() * 4) }} style ={{marginLeft:10,marginRight: 5,flex:1,width:180,minHeight:100, resizeMode:'cover'}}/>
          <View style = {styles.main_info}>
            <UnshadowedTitle uri={'teacher'} title ={"上课教师"} content={teachers}/>
            <UnshadowedTitle uri={'school'} title ={"开设学院"} content={course.course_deptname}/>
            <UnshadowedTitle uri={'course_id'} title ={"课号"} content={course.course_id}/>
            <UnshadowedTitle uri={'credit'} title ={"学分"} content={course.course_credits}/>
            <UnshadowedTitle uri={'student'} title ={"教学班数"} content={course.classes == null ? 0 :course.classes.length}/>
            {
              course.classes != null &&
                <View style = {styles.detail_button}>
                  <TouchableOpacity
                    style = {styles.detail_touchable}
                    activeOpacity={0.3}
                    onPress={this.openClassesDetail}
                  >
                  <Text
                  color = "white"
                  > 详情 </Text>
                  <Image
                    style={styles.detail_enter_arrow}
                    source={{uri:'detail_enter_arrow'}}
                  />
                  </TouchableOpacity>
                </View>
            }
          </View>
        </View>
        <View style ={styles.course_notes}>
          <Text style = {styles.notes_title}>
            课程概要
          </Text>
          <Text >
            暂无概要呢
          </Text>
        </View>
        <ClassesDetail
          onBackdropPress = {this.closeClassesDetail}
          classes = {course.classes}
          visible = {this.state.classesDetailVisible}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  class_item:{
    borderBottomWidth:2,
    borderBottomColor: 'grey',
  },
  detail_enter_arrow:{
    width:15,
    height:15,
  },
  detail_touchable:{
    flexDirection:'row',
    justifyContent:"flex-start",
    alignItems:'center',
  },
  detail_button:{
    width:"30%",
    position:'absolute',
    right:0,
    bottom:0,
  },
  notes_title:{
    marginLeft:5,
    marginTop: 5,
    fontSize: 15,
    fontWeight:'bold',
    color: 'grey',
  },
  course_notes:{
    marginLeft:40,
    marginRight:20,
    marginTop: 10,
  },
  main_part:{
    marginTop:10,
    flexDirection:"row",
    display:'flex',
  },
  main_info:{
    flex:1,
    flexDirection:"column",
    justifyContent:"space-between"
  },
  course_name: {
    flex:5
  },
  container: {
    marginTop:30,
    alignItems: 'flex-start',
    display:'flex',
    flexDirection: 'column',
  },
  course_name_img:{
    flex:1
  }
});