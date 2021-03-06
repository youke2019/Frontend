import React from 'react'
import {
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import axios from 'axios'
import { ShadowedTitle } from './ShadowedTitle'
import CommentItem from './CommentItem'
import { getCommentById } from '../utils/DataRequest'

export class CommentAbstractTitle extends React.Component {
  render () {
    return (
      <View style={styles.header_container}>
        <ShadowedTitle text={'评论'} uri={'comment'}/>
      </View>
    )
  }
}

export default class CommentAbstract extends React.Component {
  state = {
    comments: []
  }

  componentWillReceiveProps (nextProps, nextContext) {
    this.getCommentData(nextProps)
  }

  getCommentData = (props) => {
    const course_id = props == null ? this.props.course_id : props.course_id
    getCommentById({
      course_id: course_id,
      user_id: this.props.user_info.id
    }).then(response => {
      this.setState({
        comments: response.data
      })
    }).catch(err => {
      console.log('error:' + err)
    })
  }

  render () {
    const firstComm = this.state.comments.length === 0 ? null : this.state.comments[0]
    return (
      <View style={styles.container}>
        <CommentAbstractTitle/>
        <View style={styles.first_comm}>
          <CommentItem
            comment_info={firstComm}
            user_info={this.props.user_info}
            refresh={this.getCommentData}
          />
        </View>
        <View style={styles.button_container}>
          <TouchableOpacity
            onPress={this.props.onGotoCommentPage}
            style={styles.button_touchable}
            activeOpacity={0.3}
          >
            <Text
              style={styles.button_text}
            >全部评论</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  first_comm: {
    paddingHorizontal: 20,
  },
  button_text: {
    color: '#ff812e',
    textAlign: 'center'
  },
  button_touchable: {
    borderRadius: 20,
    paddingHorizontal: 55,
    paddingVertical: 5,
    borderWidth:0.5,
    borderColor:'orange',
    backgroundColor: 'white'
  },
  button_container: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  header_container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  tag_style: {
    paddingHorizontal: 5,
    marginHorizontal: 5
  },
  tag_text: {
    textAlign: 'center'
  },
  container: {
    borderTopWidth: 15,
    borderTopColor: 'whitesmoke',
    marginBottom: 10,
  }
})