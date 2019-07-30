import React from "react";
import { View, Text, FlatList, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import axios from "axios";
import { EmitError, HandleError } from '../utils/ErrorAlert'
import StackNavBar from '../components/StackNavBar'
import CourseDetail from '../components/CourseDetail'
import CommentAbstract from '../components/CommentAbstract'
import QAAbstract from '../components/QAAbstract'
import { connect } from 'react-redux'
import EvaluationAbstract from '../components/EvaluationAbstract'
import { getCourseById } from '../utils/DataRequest'
import ActionButton from 'react-native-action-button'
import  Icon  from 'react-native-vector-icons/Ionicons'

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
      this.props.navigation.navigate("Comments",{
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
    onGotoSortingPage=()=>{
      this.props.navigation.navigate("Sorting",);
    }
    onGotoNewComment=()=>{
      console.log("nav")
      this.props.navigation.navigate("NewComment",{
        course_info: this.state.courseInfo
      })
    }
    render() {
        return (
          <View>
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
                  user_id={this.props.user_info.id}
                  course_id={this.state.courseInfo.course_id}
                  onGotoEvaluationPage={this.onGotoEvaluationPage}
                />
            </ScrollView>
            <ActionButton
              buttonColor="#FDAF26"
              position={"right"}
              offsetX={30}
              hideShadow={true}
            >
              <ActionButton.Item buttonColor='#1abc9c' title="评论" onPress={this.onGotoNewComment}>
                <Icon name="md-chatbubbles" style={styles.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item buttonColor='#3498db' title="提问" onPress={() => {}}>
                <Icon name="md-help" style={styles.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item buttonColor='#FDD32A' title="评测" onPress={() => console.log("notes tapped!")}>
                <Icon name="md-create" style={styles.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item buttonColor='#1abc9c' title="进入排课" onPress={this.onGotoSortingPage}>
                <Icon name="md-calendar" style={styles.actionButtonIcon} />
              </ActionButton.Item>
            </ActionButton>

          </View>
        )
    }
}

const mapStateToProps = (state) =>({
  user_info:state.user_info,
})

export default connect(
  mapStateToProps,
)(Detail)
const styles = StyleSheet.create({
  base_container:{
    paddingTop:15,
    paddingBottom:50,
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
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
