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
import Video from 'react-native-video'
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
      image_visible: false,
      liked: props.data.current_user_praise,
      likeOrigin: props.data.current_user_praise,
      video_pause: true,
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
  openImgViewer = () => {
    this.setState({
      image_visible: true
    })
  }
  closeImgViewer = () => {
    this.setState({
      image_visible: false
    })
  }
  videoError = (err) => {
    console.log(err)
  }
  clickVideo = () => {
    const {video_pause} = this.state
    this.setState({
      video_pause: !video_pause
    })
  }
  render () {
    const { data } = this.props
    const { liked, likeOrigin, reply_visible, image_visible } = this.state
    const images = [{
      url: data.image_url,
      props: {}
    }]
    const likeNum = data.video_praise_point;
    //const likeNum = data.courseMomentPraiseList.length
    return (
      <View style={styles.card_container}>
        <ReplyBox
          onBackdropPress={this.closeComment}
          onReplyDone={this.onReplyDone}
          visible={reply_visible}
        />
        <Modal
          visible={image_visible}
          presentationStyle={'overFullscreen'}
          animation_type={'fade'}
        ><ImageViewer
          imageUrls={images}
          onSwipeDown={this.closeImgViewer}
          onClick={this.closeImgViewer}
          onCancel={this.closeImgViewer}
          saveToLocalByLongPress={false}
          enableSwipeDown
        /></Modal>
        <View style={styles.main}>
          <UserAvatarImg
              style={styles.avatar}
              img_style={styles.avatar_img}
              user_id={data.user_id}
          />
          <View style={styles.main_part}>
            <View style={styles.main_header}>
              <UserIdText style={styles.user_id} user_id={data.user_id}/>
            </View>
            <View style={styles.main_body}>
              <View style={{marginBottom:18, marginTop:5,}}>
                <ReadMore
                    numberOfLines={5}
                    renderTruncatedFooter={this._renderTruncatedFooter}
                    renderRevealedFooter={this._renderRevealedFooter}
                    onReady={this._handleTextReady}>
                  <Text style={styles.main_text_style}>{data.post_text}</Text>
                </ReadMore>
              </View>
              { /* reason for warning here, not available url will cause warning, because height can not be measured*/
                data.video_type === 'i' && data.image_url !== '' ?
                    <View style={{ width: '100%', height: 'auto', flexDirection: 'row', justifyContent: 'flex-start' }}>
                      <TouchableOpacity
                          onPress={this.openImgViewer}
                          style={{width:'100%',height:"auto"}}
                      >
                        <Image source={{ uri: data.image_url }} style={{
                          width: "75%",
                          height: 200,
                          resizeMode: 'cover',
                          borderRadius: 10,
                          overflow: 'hidden',
                          backgroundColor:'lightgrey'
                        }}/>
                      </TouchableOpacity>
                    </View>
                    :
                    data.video_type === "v" && data.video_url !== '' ?
                        <View style={{ width: '100%', height: 200, flexDirection: 'row', justifyContent: 'flex-start', }}>
                          <TouchableOpacity
                              onPress={this.clickVideo}
                              style={{width:'100%'}}
                          >
                            <Video
                                source={{ uri: data.video_url }}
                                ref={(ref) => {this.player = ref}}
                                paused={this.state.video_pause}
                                resizeMode={"cover"}
                                poster={"loading"}
                                posterResizeMode={"center"}
                                onError={this.videoError}
                                style={styles.backgroundVideo}
                            />
                          </TouchableOpacity>
                        </View> : null

              }
            </View>
            <View style={{padding: 5}}>
              <Text style={{fontSize: 12}}> {data.post_time} </Text>
            </View>
          </View>
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
    marginHorizontal: 10,
    marginVertical: 5,
    paddingTop: 10,
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
  main: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  main_part: {
    flexDirection: 'column',
    flex: 1,
    height: '100%',
    marginHorizontal: 10,
    paddingTop: 10,
    width:'100%',
  },
  main_header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  user_id: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  main_body: {
    paddingVertical: 5,
    width:'100%'
  },
  main_text_style: {
    lineHeight: 20,
    fontSize: 16,
    fontWeight: '100',
    letterSpacing: 1,
    color: 'black'
  },
  main_bottom: {
    paddingVertical: 10,
    paddingHorizontal: 30,
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
    borderRadius: 5,
    marginHorizontal: 6,
  },
  comment_item: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  comment_user_id: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  comment_text: {
    fontSize: 14,
    lineHeight: 18,
  },
  backgroundVideo: {
    width: "90%",
    height: "100%",
    borderRadius:10,
    backgroundColor:'lightgrey'
  }
})

export default connect(
  mapStateToProps
)(HighlightCard)