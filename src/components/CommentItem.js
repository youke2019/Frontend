import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { connect } from 'react-redux'
import axios from 'axios'
import ReplyBox from './ReplyBox'
import { UserIdText } from './UserIdText'
import { sendCommentReply } from '../utils/DataRequest'

const mapStateToProps = (state) =>({
  user_info:state.user_info,
})

 class CommentItem extends React.Component {
   constructor (props){
     super(props)
     const liked = props.comment_info !== null ? props.comment_info.current_user_praise : false;
    this.state = {
      reply_visible: false,
      liked: liked,
    }
   }
  componentWillReceiveProps (nextProps, nextContext) {
    const liked = nextProps.comment_info !== null ? nextProps.comment_info.current_user_praise : false;
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
    this.setState({
      reply_visible:false,
    })
  }
  closeComment =()=>{
    this.setState({
      reply_visible:false,
    })
  }
  onPressLike = () =>{
    let action ="";
    if(!this.state.liked)   action = "praise"
    else  action = "unpraise"
    const {user_info,comment_info} = this.props
    axios({
      method:'get',
      url: baseUrl + "/courses/comments/" + action,
      params:{
        user_id:user_info.id,
        course_comment_id:comment_info.course_comment_id,
      }
    }).then((response)=>{
      this.props.refresh();
    }).catch((err)=>{
      console.log(err);
    })
  }
  render(){
    const {
      comment_info =null,
    } = this.props;

    const {reply_visible} = this.state;
    return (
      <View>
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
            <View style ={styles.avatar} >
              <Image source = {{uri:"default_avatar_1"}} style={styles.avatar_img} />
            </View>
            <View style ={styles.comment}>
              <View style={styles.comment_header}>
                <UserIdText style = {styles.user_id} user_id={comment_info.user_id}/>
                <Text>{comment_info.course_comment_time}</Text>
              </View>
              <View>
                <Text style = {styles.comment_body}> {comment_info.course_comment_content}</Text>
              </View>
              <View style={styles.comment_bottom}>
                <TouchableOpacity
                  onPress={this.onPressComment}
                  style = {styles.button_comment}
                  activeOpacity={0.3}
                >
                  <Image source={{uri:'pinglun'}} style={{width:14,height:14,resizeMode: 'contain'}}/>
                  <Text style={{fontSize: 12,fontWeight:'100',marginLeft: 3,}}>评论</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.onPressLike}
                  style = {styles.button_like}
                  activeOpacity={0.3}
                >
                  <Image source={{uri:'dianzan'}} style={ this.state.liked ?   {width:14,height:14,resizeMode: 'contain',tintColor:'orange'}: {width:14,height:14,resizeMode: 'contain'}}/>
                  <Text style={{fontSize: 12,fontWeight:'100'}}>{comment_info.course_comment_praise_point }</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.reply_area}>
                {
                  comment_info.courseCommentReplyList.map((item, index) => {
                    return item.isbanned ? null : (
                      <View style={styles.reply_item} key={index}>
                        <UserIdText user_id={item.user_id} style={styles.reply_user_id}/>
                        <Text style={styles.reply_text}>{': ' + item.course_comment_reply_content}</Text>
                      </View>)
                  })
                }
              </View>
            </View>
            </View></View>)
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
  /*card_container:{
    width:340,
    paddingHorizontal:20,
    paddingVertical:30,
    justifyContent: 'center',
    alignItems: 'center',
  },*/

  card_container:{
    paddingHorizontal:10,
    paddingVertical: 10,
    alignItems: 'flex-start',
    borderRadius: 20,
    elevation: 2,
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
    flexDirection:"column",
    flex:1,
    marginLeft:10,
    marginRight:10,
  },
  comment_header:{
    flexDirection:'row',
    justifyContent: "space-between",
    paddingTop:12,
  },
  user_id:{
    fontWeight:'bold',
    width:100,
  },
  comment_body:{
    paddingVertical:20
  },
  comment_bottom:{
    flex:1,
    flexDirection:'row',
    justifyContent: "flex-end",
    alignItems:'center',
  },
  button_like:{
    paddingLeft:10,
    width:'auto',
    height:20,
    flexDirection:'row',
    justifyContent: "space-around",
    alignItems:'center',
  },
  button_comment:{
    fontSize:10,
    flexDirection:'row',
    justifyContent: "space-between",
    alignItems:'center',
    width:'auto',
    height:20,
  },
  reply_area: {
    borderRadius:5,
  },
  reply_item: {
    flexDirection: 'row'
  },
  reply_user_id: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  reply_text: {
    fontSize: 14,
    lineHeight: 18,
    width:"79%",
  }
});

export default  connect(
  mapStateToProps,
)(CommentItem)