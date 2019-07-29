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

const Tag = (props) => {
  return (
    <ImageBackground
      style={styles.tag_style}
      imageStyle={{ resizeMode: 'stretch' }}
      source={{ uri: 'tag' }}
    >
      <Text> {props.text}</Text>
    </ImageBackground>
  )
}

export class CommentAbstractTitle extends React.Component {
  render () {
    const { tags = ['水课', '给分很高', '老师很吵', 'fnu#&2G'] } = this.props
    return (
      <View style={styles.header_container}>
        <ShadowedTitle text={'评论'} uri={'comment'}/>
        {
          tags.map((tag, index) =>
            <Tag text={tag} key={index} style={styles.tag_text}/>)
        }
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
    axios({
      method: 'get',
      url: baseUrl + '/courses/comments/find',
      params: {
        course_id: course_id,
        user_id: this.props.user_info.id
      }
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
        {/* <ReplyBox />*/}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  first_comm: {
    marginHorizontal: 20
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
    marginBottom: 10
  }

})