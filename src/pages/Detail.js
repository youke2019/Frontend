import React from "react";
import { View, Text, FlatList, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import axios from "axios";
import { EmitError, HandleError } from '../utils/ErrorAlert'
import { ShadowedTitle } from '../components/ShadowedTitle'
import { Image } from 'react-native-elements'
import { UnshadowedTitle } from '../components/UnshadowedTitle'

export const Title = (props) =>(
  <View style = {styles.Title}>
    <Text> {props.title} </Text>
    <Text> {props.content}</Text>
    {/*父子组件间传值*/}
  </View>
)


const Time = (props) =>(
  <View style = {styles.Title}>
    <Text> 上课时间 :</Text>
    <Text> {props.bw} 至 {props.ew} 周 {props.eo}周 周{props.date} 第 {props.bs}至{props.es} 节</Text>
    {/*父子组件间传值*/}
  </View>
)
const dateMap =["","一","二","三","四","五","六","日"];
const weekMap ={
  o: "单周",
  e: "双周",
  b: "全周"
}
class CourseDetail extends React.Component{ //todo: redo this page.

    render(){
        const {course} = this.props;
        console.log(course)
        return(
            <View style = {styles.container}>
              <View style = {styles.title_container}>
                <View >
                  <Image source={{uri:'course_name'}} style={{width: 40, height: 40}}/>
                </View>
                <ShadowedTitle text={course.course_name} style = {styles.course_name}/>
              </View>
              <View style={styles.main_part}>
                <View style = {styles.main_pic}>
                   <Image source={{uri:'building'}} style ={{height:100,width:100}}/>
                </View>
                <View style = {styles.main_info}>
                  <UnshadowedTitle uri={'teacher'} title ={"上课教师"} content={"老师"}/>
                  <UnshadowedTitle uri={'clock'} title ={"上课时间"} content={"周二下午2-4"}/>
                  <UnshadowedTitle uri={'location'} title ={"上课地点"} content={"东上院102"}/>
                  <UnshadowedTitle uri={'school'} title ={"开设学院"} content={"设计"}/>
                  <UnshadowedTitle uri={'course_id'} title ={"课号       "} content={course.course_id}/>
                  <UnshadowedTitle uri={'credit'} title ={"学分       "} content={course.course_credits}/>
                </View>
              </View>
              <View style ={styles.course_notes}>
                <Text style = {styles.notes_title}>
                  选课备注
                </Text>
                <Text >
                  {"这是一门好课毫克好好可这是一门好课毫克好好可这是一门好课毫克好好可这是一门好课毫克好好可这是一门好课毫克好好可这是一门好课毫克好好可这是一门好课毫克好好可"}
                </Text>
              </View>
                <View style ={styles.box}>
                    <Title title ={ "课程号"} content = {course.course_id}/>
                    <Title title ={"学分" } content = {course.course_credits}/>
                    <Title title = {"是否为通识"} content ={course.general? "是":"否"}/>
                    <Title title = {"通识类型"} content = {course.general_type}/>
                    <Title title = {"选课备注"} content = {""}/>
                    <Text> 教学班信息</Text>
                    <FlatList
                        data={course.classes}
                        keyExtractor={(item) => item.classname.toString()}
                        renderItem={({item}) =>
                            <View style={{height:200}}>
                                <Title title={"教学班"} content={item.classname}/>
                                <Title title={"任课老师"} content={item.teacher_name}/>
                                <FlatList data={item.classSegments}
                                          renderItem={({item}) =>
                                              <View>
                                                  <Title title={"上课地点"} content={item.courseroom}/>
                                                  <Text>上课时间</Text>
                                                  <Time bw = {item.begin_week} ew = {item.end_week} eo = {dateMap[item.odd_or_even]} date = {dateMap[item.week]} bs = {item.begin_sec} es = {item.end_sec}/>
                                              </View>
                                          }
                                          keyExtractor={(item) => item.class_sec_id.toString()}
                                />
                            </View>
                        }
                    />
                </View>

            </View>
        )
    }
}
/*
Class CommentTitle extends React.Component{
    render(){
        return(
            <View style = {styles.Title}>
                <Text> 评论 <Text>
                <Text> {this.props.tag}</Text>
            </View>
        )
    }
}
Class QuestionTitle extends React.Component{
    render(){
        return(
            <View style = {styles.Title}>
                <Text> 问答区 <Text>
            </View>
        )
    }
}
Class EvaluateTitle extends React.Component{
    render(){
        return(
            <View style = {styles.Title}>
                <Text> 评测 <Text>
            </View>
        )
    }
}
*/
class Detail extends React.Component {
    state = {
        courseInfo :"",
    }

    static navigationOptions = ({navigation}) => ({
        title : '课程详情'
    })
    //标题

    setCourse = (data) =>{
        this.setState({
            courseInfo:data
        })
    }

    //what's beneath is the function that will execute once the component is created
    componentWillMount() {
        const params = this.props.navigation.state.params;
        axios.get(baseUrl + '/courses/specific', {
          params:params
        }).then((response) => {
            this.setCourse(response.data)
        }).catch(error => {
            console.log(error)
            EmitError({ error_msg:"获取课程信息时发生了错误" })
        })
    }

    render() {
        return (
            <View>
                <CourseDetail course ={this.state.courseInfo} />
            </View>
        )
    }
}

export default Detail


const styles = StyleSheet.create({
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
    marginTop:30,
    flexDirection:"row",
    display:'flex',
  },
  main_pic:{
    backgroundColor: "grey",
    flex:1,
  },
  main_info:{
    flex:1,
  },
  course_name: {
    flex:5
  },
  title_container:{
    marginTop:20,
    marginLeft:20,
    flexDirection: 'row',
    display:'flex'
  },
  box:{
    borderStyle: 'dashed',
    borderWidth : 1,
  },
  container: {
    alignItems: 'flex-start',
    display:'flex',
    flexDirection: 'column',
  },
  course_name_img:{
    flex:1
  }
});
