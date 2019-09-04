import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native"
import ReplyBox from './ReplyBox'
import { UserIdText } from './UserIdText'
import { praiseComment, sendCommentReply, unPraiseComment } from '../utils/DataRequest'
import { UserAvatarImg } from './UserAvatarImg'



 class CommentItem extends React.Component {
   constructor (props){
     super(props)
     const liked = props.comment_info != null ? props.comment_info.current_user_praise : false;
    this.state = {
      reply_visible: false,
      liked: liked,
    }
   }
  componentWillReceiveProps (nextProps, nextContext) {
    const liked = nextProps.comment_info != null ? nextProps.comment_info.current_user_praise : false;
    this.setState({
      liked:liked,
    })
  }

   onPressComment = ()=>{
    this.setState({
      reply_visible:true,
    })
  }
  onReplyDone = (msg)=>{
    sendCommentReply(this.props.comment_info.course_comment_id,this.props.user_info.id,msg)
      .then(response=>{
        this.props.refresh();
      }).catch(err=>console.log(err))
    this.closeComment()
  }
  closeComment =()=>{
    this.setState({
      reply_visible:false,
    })
  }
  onPressLike = () =>{
    const {user_info,comment_info} = this.props
    if(!this.state.liked) {
      praiseComment({
        user_id: user_info.id,
        course_comment_id: comment_info.course_comment_id,
      }).then((response) => {
        console.log("resfresh")
        this.props.refresh();
      }).catch((err) => {console.log(err);})
    }else {
      unPraiseComment({
        user_id: user_info.id,
        course_comment_id: comment_info.course_comment_id,
      }).then(() => {
        this.props.refresh();
      }).catch((err) => {console.log(err);})
    }

  }
  render(){
    const {
      comment_info = null,
    } = this.props;

    const {reply_visible} = this.state;
    return (
      <View >
      {
        comment_info === null ?
          (<View style = {styles.empty_container}>
            <View
              style ={{width:340,height:100,flexDirection:'column',alignItems:'center',justifyContent:'center'}}
            >
              <Text style={styles.empty_msg}> 还没有人评论，快来抢占沙发吧😋</Text>
            </View>
          </View>)
          :
          (<View
              style={styles.card_container}
            >
            <View style = {styles.container}>
              <View style ={styles.comment}>
                <View style={styles.comment_header}>
                  <UserAvatarImg
                    style={styles.avatar}
                    img_style={styles.avatar_img}
                    user_id={comment_info.user_id}
                  />
                  <UserIdText style = {styles.user_id} user_id={comment_info.user_id}/>
                </View>
                <View style={styles.comment_body_container}>
                  <Text style = {styles.comment_body}> {comment_info.course_comment_content}</Text>
                </View>
                <View style={styles.comment_bottom}>
                  <Text style={{fontSize: 12, padding: 5}}>{comment_info.course_comment_time}</Text>
                  <TouchableOpacity
                      onPress={this.onPressComment}
                      style = {styles.button_comment}
                      activeOpacity={0.3}
                  >
                    <Image source={{uri:'pinglun'}} style={{width:14,height:14,resizeMode: 'contain'}}/>
                    <Text style={{fontSize: 12,padding: 5,}}>评论</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      onPress={this.onPressLike}
                      style = {styles.button_like}
                      activeOpacity={0.3}
                  >
                    <Image source={{uri:'dianzan'}} style={ this.state.liked ?   {width:14,height:14,resizeMode: 'contain',tintColor:'orange'}: {width:14,height:14,resizeMode: 'contain'}}/>
                    <Text style={{fontSize: 12,padding: 5}}>{comment_info.course_comment_praise_point }</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.reply_area}>
                  {
                    comment_info.courseCommentReplyList.map((item, index) => {
                      return  (
                          <View style={styles.reply_item} key={index}>
                            <UserIdText user_id={item.user_id} style={styles.reply_user_id}/>
                            <Text style={styles.reply_text}>{': ' + item.course_comment_reply_content}</Text>
                          </View>)
                    })
                  }
                </View>
              </View>
            </View>
          </View>)
      }
      <ReplyBox
        visible = {reply_visible}
        onReplyDone = {this.onReplyDone}
        onBackdropPress={this.closeComment}
      />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  card_container:{
    paddingHorizontal:10,
    paddingVertical: 10,
    alignItems: 'flex-start',
    borderRadius: 20,
    elevation: 4,
    backgroundColor: '#FFFFFF',
  },
  container:{
    flexDirection:'row',
  },
  avatar:{
    flexDirection: 'column',
    justifyContent:'flex-start',
  },
  avatar_img:{
    width:40,
    height:40,
    borderRadius:20,
    marginRight: 8,
  },
  empty_container:{
    flexDirection:'column',
    alignItems: 'center',
  },
  empty_msg:{
    paddingVertical:20,
    alignItems: 'center',
  },
  comment:{
    flex:1,
    marginLeft:10,
    marginRight:10,
  },

  comment_header:{
    flexDirection:'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop:12,
  },
  user_id:{
    fontSize: 15,
    color: '#000000',
  },
  comment_body_container:{
    paddingVertical: 12,
  },
  comment_body:{
    paddingVertical:20
  },
  comment_bottom:{
    flex:1,
    flexDirection:'row',
    justifyContent: "space-around",
    alignItems:'center',
    paddingBottom: 10,
  },
  button_like:{
    height:20,
    flexDirection:'row',
    alignItems:'center'
  },
  button_comment:{
    flexDirection:'row',
    alignItems:'center',
    height:20,
  },
  reply_area: {
    borderRadius:5,
    paddingBottom: 20,
  },
  reply_item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
  },
  reply_user_id: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  reply_text: {
    fontSize: 14,
    lineHeight: 18,
  }
});

export default CommentItem