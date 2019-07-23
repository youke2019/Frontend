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
import { connect } from 'react-redux'
import EvaluationAbstract from '../components/EvaluationAbstract'
import { getCourseById } from '../utils/DataRequest'

class Detail extends React.Component {
    state = {
        courseInfo :"",
    }
    componentWillMount() {
      this.props.navigation.addListener(
        'willFocus',
        () => {this.refresh()}
      )
        const params = this.props.navigation.state.params;
        getCourseById(params)
          .then((response) => {
          this.setState({
            courseInfo:response.data
          })
        }).catch(error => {
            EmitError({ error_msg:"获取课程信息时发生了错误" })
        })
    }
    refresh =()=>{
      const params = this.props.navigation.state.params;
      getCourseById(params)
        .then((response) => {
          this.setState({
            courseInfo:response.data
          })
        }).catch(error => {
        EmitError({ error_msg:"获取课程信息时发生了错误" })
      })
    }
    onGotoCommentPage=()=>{
      this.props.navigation.navigate("Comment",{
        course_info:this.state.courseInfo,
        user_info:this.props.user_info,
      });
    }
    onGotoQuestionPage=()=>{
      this.props.navigation.navigate("Questions",{
        course_info:this.state.courseInfo,
        user_info:this.props.user_info,
      });
    }
    onGotoEvaluationPage=()=>{
    this.props.navigation.navigate("Evaluations",{
      course_info:this.state.courseInfo,
    });
  }

    render() {
        return (
            <ScrollView
              style={styles.base_container}
              keyboardShouldPersistTaps={'handled'}
            >
                <StackNavBar
                  navigation={this.props.navigation}
                />
                <CourseDetail
                  course ={this.state.courseInfo}
                />
                <CommentAbstract
                  navigation={this.props.navigation}
                  onGotoCommentPage={this.onGotoCommentPage}
                  course_id={this.state.courseInfo.course_id}
                  user_info={this.props.user_info}
                />
                <QAAbstract
                  navigation={this.props.navigation}
                  onGotoQuestionPage={this.onGotoQuestionPage}
                  course_id={this.state.courseInfo.course_id}
                  user_id={this.props.user_info.id}
                />
                <EvaluationAbstract
                  onGotoEvaluationPage={this.onGotoEvaluationPage}
                />
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) =>({
  user_info:state.user_info,
})
export default  connect(
  mapStateToProps,
)(Detail)
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
