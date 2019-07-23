import React from 'react'
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Modal
} from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import ReplyBox from './ReplyBox'
import ReadMore from 'react-native-read-more'
import ImageViewer from 'react-native-image-zoom-viewer'
import { UserIdText } from './UserIdText'
import { UserAvatarImg } from './UserAvatarImg'
import { commentHighlight, praiseHighlight, unPraiseHighlight } from '../utils/DataRequest'

const mapStateToProps = (state) => ({
  user_info: state.user_info
})

class HighlightCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = ({
      reply_visible: false,
      liked: props.data.current_user_praise,
      likeOrigin: props.data.current_user_praise
    })
  }

  componentWillReceiveProps (nextProps, nextContext) {
    const isLike = nextProps.data.current_user_praise
    this.setState({
      liked: isLike,
      likeOrigin: isLike
    })
  }

  onPressComment = () => {
    this.setState({
      reply_visible: true
    })
  }
  onReplyDone = (msg) => {
    this.setState({
      reply_visible: false
    })
    this.sendComment(msg)
  }
  sendComment = (msg) => {
    commentHighlight(this.props.user_id, this.props.data.video_id, msg)
      .then(response => {
        console.log(response)
        this.props.refresh()
      })
      .catch(err => console.log(err))
  }
  closeComment = () => {
    this.setState({
      reply_visible: false
    })
  }
  onPressLike = () => {
    console.log(this.props.user_id)
    console.log(this.props.data.video_id)
    if (this.state.liked) {
      unPraiseHighlight(this.props.user_id, this.props.data.video_id)
        .then(response => {console.log(response)})
        .catch(err => console.log(err))
    } else {
      praiseHighlight(this.props.user_id, this.props.data.video_id)
        .then(response => {console.log(response)})
        .catch(err => console.log(err))
    }
    this.setState({
      liked: !this.state.liked
    })
  }

  render () {
    const {
      data
    } = this.props
    const {
      liked,
      likeOrigin,
      reply_visible
    } = this.state
    const likeNum = data.courseMomentPraiseList.length
    return (
      <View style={styles.card_container}>
        <ReplyBox
          onBackdropPress={this.closeComment}
          onReplyDone={this.onReplyDone}
          visible={reply_visible}
        />
        <UserAvatarImg
          style={styles.avatar}
          img_style={styles.avatar_img}
          user_id={data.user_id}
        />
        <View style={styles.main_part}>
          <View style={styles.main_header}>
            <UserIdText style={styles.user_id} user_id={data.user_id}/>
            <Text> {data.post_time} </Text>
          </View>
          <View style={styles.main_body}>
            <ReadMore
              numberOfLines={5}
              renderTruncatedFooter={this._renderTruncatedFooter}
              renderRevealedFooter={this._renderRevealedFooter}
              onReady={this._handleTextReady}>
              <Text
                style={styles.main_text_style}>{data.post_text}</Text>
            </ReadMore>
            {
              data.video_type === 'n' || data.image_url === "" ? null :
                data.video_type === 'i'  ?
                  <TouchableOpacity style={{width:"100%",height:'auto',flexDirection:'row',justifyContent:'flex-start'}}>
                    <Image source={{ uri: data.image_url }} style={{ width: 150, height: 250,resizeMode: 'contain',borderRadius: 10,overflow:'hidden' }}/>
                  </TouchableOpacity>
                  : <View/>
            }
          </View>
          <View style={styles.main_bottom}>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={this.onPressComment}
            >
              <Image source={{ uri: 'comment_yellow' }} style={{ width: 30, height: 30, marginRight: 5 }}/>
              <Text>评论</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={this.onPressLike}
            >
              <Image source={{ uri: 'like_yellow' }} style={{ width: 30, height: 30, marginRight: 5 }}/>
              <Text style={liked ? {
                color: 'orange',
                fontSize: 15
              } : { fontSize: 15 }}>{likeNum + liked - likeOrigin}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.comment_area}>
            {
              data.courseMomentCommentList.map((item, index) => {
                return item.isbanned ? null : (
                  <View style={styles.comment_item} key={index}>
                    <UserIdText user_id={item.user_id} style={styles.comment_user_id}/>
                    <Text style={styles.comment_text}>{': ' + item.video_comment_content}</Text>
                  </View>)
              })
            }
          </View>
        </View>
      </View>
    )
  }
  _renderTruncatedFooter = (handlePress) => {
    return (
      <Text style={{ color: 'grey', fontWeight: 'bold', marginTop: 5 }} onPress={handlePress}>
        展开
      </Text>
    )
  }
  _renderRevealedFooter = (handlePress) => {
    return (
      <Text style={{ color: 'grey', fontWeight: 'bold', marginTop: 5 }} onPress={handlePress}>
        收起
      </Text>
    )
  }
  _handleTextReady = () => {
    // ...
  }
}

const styles = StyleSheet.create({
  card_container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 5,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  container: {
    flexDirection: 'row'
  },
  avatar: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  avatar_img: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  main_part: {
    flexDirection: 'column',
    flex: 1,
    height: '100%',
    marginHorizontal: 10,
    paddingTop: 15
  },
  main_header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  user_id: {
    fontSize: 15,
    fontWeight: 'bold',
    width: 120
  },
  main_body: {
    paddingVertical: 5
  },
  main_text_style: {
    paddingVertical:5,
    lineHeight: 20,
    fontSize: 18,
    fontWeight: '100',
    letterSpacing: 1,
    color: 'black'
  },
  main_bottom: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button_like: {
    paddingLeft: 10,
    width: 'auto',
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  button_comment: {
    fontSize: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 'auto',
    height: 20
  },
  comment_area: {
    backgroundColor:'whitesmoke',
    borderRadius:5,
  },
  comment_item: {
    flexDirection: 'row'
  },
  comment_user_id: {
    fontSize: 14,
    fontWeight: '200'
  },
  comment_text: {
    fontSize: 14,
    lineHeight: 18,
    width:"79%",
  }
})

export default connect(
  mapStateToProps
)(HighlightCard)