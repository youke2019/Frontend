import React from "react";
import { View, Text, FlatList, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import axios from "axios";
import { EmitError, HandleError } from '../utils/ErrorAlert'
import { ShadowedTitle } from '../components/ShadowedTitle'
import { Image, Overlay } from 'react-native-elements'
import { UnshadowedTitle } from '../components/UnshadowedTitle'
import StackNavBar from '../components/StackNavBar'
import CourseDetail from '../components/CourseDetail'
import CommentAbstract from '../components/CommentAbstract'
import QAAbstract from '../components/QAAbstract'

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

    componentWillMount() {
        const params = this.props.navigation.state.params;
        axios.get(baseUrl + '/courses/specific', {
          params:params
        }).then((response) => {
          this.setState({
            courseInfo:response.data
          })
        }).catch(error => {
            console.log(error)
            EmitError({ error_msg:"获取课程信息时发生了错误" })
        })
    }

    render() {
        return (
            <ScrollView style={styles.base_container}>
                <StackNavBar
                  navigation={this.props.navigation}
                />
                <CourseDetail
                  course ={this.state.courseInfo}
                />
                <CommentAbstract
                  navigation={this.props.navigation}
                  course_id={this.state.courseInfo.course_id}
                />
                <QAAbstract
                /> 
            </ScrollView>
        )
    }
}

export default Detail

const styles = StyleSheet.create({
  base_container:{
    paddingTop:15,
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
    marginTop:30,
    flexDirection:"row",
    display:'flex',
  },
  main_pic:{
    marginLeft:10,
    backgroundColor: "yellow",
    flex:1,
  },
  main_info:{
    flex:1,
  },
  course_name: {
    flex:5
  },
  title_container:{
    height:25,
    marginTop:20,
    marginLeft:20,
    justifyContent:'flex-start',
    flexDirection: 'row',
    display:'flex',
  },
  box:{
    borderStyle: 'dashed',
    borderWidth : 1,
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
