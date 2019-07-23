import React from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import StackNavBar from '../components/StackNavBar'
import CommentItem from '../components/CommentItem'
import axios from 'axios'
import { CommentAbstractTitle } from '../components/CommentAbstract'
import { ParallaxImage } from 'react-native-snap-carousel'
import { Image } from 'react-native-elements'
import ReplyBox from '../components/ReplyBox'

export default class Comment extends React.Component {
  state = {
    course_info: this.props.navigation.state.params.course_info,
    user_info: this.props.navigation.state.params.user_info,
    comments: [],
    reply_visible:false,
  }

  componentWillMount () {
    this.getCommentData()
  }
  getCommentData = () => {
    const params = {
      course_id: this.state.course_info.course_id,
      user_id: this.state.user_info.id,
    }
    axios({
      method: 'get',
      url: baseUrl + '/courses/comments/find',
      params: params
    }).then(response => {
      console.log("repsonse")
      console.log(response.data)
      this.setState({
        comments: response.data
      })
    }).catch(err => {
      console.log(err)
    })
  }
  onCommentDone = (msg) =>{
    console.log(msg);
    console.log(this.state)
    const data = {
      course_id:this.state.course_info.course_id,
      user_id:this.state.user_info.id,
      course_comment_content:msg,
    }
    axios({
      method:"post",
      url:baseUrl+"/courses/comments/add",
      data:data,
    }).then((response)=>{
      console.log(response)
      this.closeComment();
      this.getCommentData();
    }).catch(err => console.log(err))
  }
  closeComment = ()=>{
    this.setState({
      reply_visible:false,
    })
  }
  openComment = () =>{
    this.setState({
      reply_visible:true,
    })
  }
  render () {
    const { comments,reply_visible } = this.state
    return (
      <View style={styles.container}>
        <ScrollView
          style={{height:'100%'}}
          keyboardShouldPersistTaps={'handled'}
        >
        <ReplyBox
          visible={reply_visible}
          onReplyDone={this.onCommentDone}
          onBackdropPress={this.closeComment}
        />
        <StackNavBar
          navigation={this.props.navigation}
        />
        <View style={styles.title}>
          <CommentAbstractTitle/>
        </View>
        <View style={styles.new_header}>
          <TouchableOpacity
            onPress={this.openComment}
          >
            <View style={styles.new_button}>
              <Image source={{ uri: 'discuss' }} style={styles.new_button_img}/>
              <Text style={styles.new_question_text}>我有话说</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.comment_list}>
          <FlatList
            data={comments}
            renderItem={({ item, index }) =>
              <View key={index}>
                <CommentItem comment_info={item} refresh={this.getCommentData} />
                <View style={styles.divider}/>
              </View>
            }
            keyExtactor={(item) => item.comment_id}
          />
        </View>
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    flexDirection: 'column'
  },
  divider: {
    marginVertical: 3
  },
  comment_list: {
    paddingTop: 0,
    marginLeft: 30
  },
  title: {
    marginTop: 25
  },
  new_header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  new_button: {
    backgroundColor: '#200948',
    borderRadius: 8,
    flexDirection: 'row',
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  new_button_img: {
    height: 24,
    width: 24
  },
  new_question_text: {
    paddingTop: 3,
    paddingHorizontal: 3,
    color: '#FFFFFF',
    letterSpacing: 3,
    fontSize: 15,
    fontFamily: '字魂95号-手刻宋',
    lineHeight: 20
  }
})