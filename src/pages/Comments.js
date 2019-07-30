import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import CommentItem from '../components/CommentItem'
import axios from 'axios'
import { Image } from 'react-native-elements'
import ReplyBox from '../components/ReplyBox'

export default class Comments extends React.Component {
  state = {
    course_info: this.props.navigation.state.params.course_info,
    user_info: this.props.navigation.state.params.user_info,
    comments: [],
    reply_visible: false
  }

  componentWillMount () {
    this.getCommentData()
  }

  getCommentData = () => {
    const params = {
      course_id: this.state.course_info.course_id,
      user_id: this.state.user_info.id
    }
    axios({
      method: 'get',
      url: baseUrl + '/courses/comments/find',
      params: params
    }).then(response => {
      this.setState({
        comments: response.data
      })
    }).catch(err => {
      console.log(err)
    })
  }
  onCommentDone = (msg) => {
    const data = {
      course_id: this.state.course_info.course_id,
      user_id: this.state.user_info.id,
      course_comment_content: msg
    }
    axios({
      method: 'post',
      url: baseUrl + '/courses/comments/add',
      data: data
    }).then((response) => {
      this.closeComment()
      this.getCommentData()
    }).catch(err => console.log(err))
  }
  closeComment = () => {
    this.setState({
      reply_visible: false
    })
  }
  openComment = () => {
    this.setState({
      reply_visible: true
    })
  }

  render () {
    const { comments, reply_visible } = this.state
    return (
      <View style={styles.container}>
        <ScrollView
          style={{ height: '100%' }}
          keyboardShouldPersistTaps={'handled'}
        >
          <ReplyBox
            visible={reply_visible}
            onReplyDone={this.onCommentDone}
            onBackdropPress={this.closeComment}
          />
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
            {
              comments.map((item, index) =>(
                  <View key={index} style={styles.comment}>
                    <CommentItem comment_info={item} refresh={this.getCommentData} key={index}/>
                  </View>))
            }
          </View>
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#FFFFF8'
  },
  comment_list: {
    paddingTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10
  },
  comment:{
    paddingVertical: 20,
  },
  new_header: {
    paddingTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  new_button: {
    backgroundColor: '#FDAF26',
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
    letterSpacing: 3,
    fontSize: 15,
    fontFamily: '字魂95号-手刻宋',
    lineHeight: 20
  }
})