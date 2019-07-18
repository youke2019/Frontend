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
const mapStateToProps = (state) =>({
  user_info:state.user_info,
})

 class CommentItem extends React.Component {
  state ={
    reply_visible: false,
    liked:false,
  }
  onPressComment = ()=>{
    this.setState({
      reply_visible:true,
    })
  }
  onReplyDone = (msg)=>{
    this.setState({
      reply_visible:false,
    })
    console.log("comment"+msg)
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
    console.log(user_info.id)
    console.log(comment_info.course_comment_id)
    axios({
      method:'get',
      url: baseUrl + "/courses/comments/" + action,
      params:{
        user_id:user_info.id,
        course_comment_id:comment_info.course_comment_id,
      }
    }).then((response)=>{
      console.log(action)
      console.log(response);
      this.setState({
        liked : !this.state.liked,
      })
    }).catch((err)=>{
      console.log(err);
    })
  }
  render(){
    const {
      comment_info =null,
    } = this.props;
    const {reply_visible} = this.state;
    console.log(comment_info)
    return (
      <View>
      {
        comment_info === null ?
          (<View style = {styles.empty_container}>
            <ImageBackground
              source={{uri:'more_button'}}
              style ={{width:340,height:100,flexDirection:'column',alignItems:'center',justifyContent:'center'}}
            >
              <Text style={styles.empty_msg}> 还没有人评论，快来抢占沙发吧😋</Text>
            </ImageBackground>
          </View>)
          :
          (<ImageBackground
              style={styles.card_container}
              imageStyle={{resizeMode: 'stretch'}}
              source={{uri:'course_card'}}
            >
            <View style = {styles.container}>
            <View style ={styles.avatar} >
              <Image source = {{uri:"default_avatar_"+Math.floor(Math.random()*4)}} style={styles.avatar_img} />
            </View>
            <View style ={styles.comment}>
              <View style={styles.comment_header}>
                <Text style = {styles.user_id}>{comment_info.user_id}</Text>
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
                  <Text style={{fontSize: 12,fontWeight:'100'}}>{comment_info.course_comment_praise_point + this.state.liked}</Text>
                </TouchableOpacity>
              </View>
            </View>
            </View></ImageBackground>)
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
    width:340,
    height:200,
    paddingHorizontal:20,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  user_id:{
    fontWeight:'bold',
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
  }
});

export default  connect(
  mapStateToProps,
)(CommentItem)