import React from "react";
import {View, Text, FlatList, Alert,StyleSheet,ScrollView} from "react-native";
import axios from "axios";
import { EmitError, HandleError } from '../utils/ErrorAlert'

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
class CourseInfo extends React.Component{

    render(){
        const {course} = this.props;
        console.log(course)
        return(
            <View style = { styles.container}>

                <Title title = {"课程"} content = { course.course_name}/>
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
        title : 'details for course ${navigation.state.params.course_id}'
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
                <CourseInfo course ={this.state.courseInfo} />
            </View>
        )
    }
}

export default Detail


const styles = StyleSheet.create({
  Title: {
    backgroundColor: '#F5FCFF',
  },
  box:{
    borderStyle: 'dashed',
    borderWidth : 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    top : 50,
    bottom: 50,
  },
});
