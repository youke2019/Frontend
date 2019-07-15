import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity
} from "react-native";


export default class CommentItem extends React.Component {
  onPressComment = ()=>{

  }
  onPressLike = () =>{

  }
  render(){
    const {
      comment_info =null,
    } = this.props;
    console.log()
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
          (<View style = {styles.container}>
            <View style ={styles.avatar} >
              <Image source = {{uri:"default_avatar_0"}} style={styles.avatar_img} />
            </View>
            <View style = {styles.comment}>
              <View style={styles.comment_header}>
                <Text>{comment_info.user_id}</Text>
                <Text>{comment_info.course_comment_time}</Text>
              </View>
              <Text style = {styles.comment_body}> {comment_info.course_comment_content}</Text>
              <View style={styles.comment_bottom}>
                <TouchableOpacity
                  onPress={this.onPressComment}
                  style = {styles.button_comment}
                  activeOpacity={0.3}
                >
                  <Image source={{uri:'pinglun'}} styles={{width:10,height:10}}/>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.onPressLike}
                  style = {styles.button_like}
                  activeOpacity={0.3}>
                  <Image source={{uri:'dianzan'}} styles={{width:10,height:10}}/>
                </TouchableOpacity>
              </View>
            </View>
          </View>)
      }
      </View>
    )
  }
}
const styles = StyleSheet.create({

  container:{
    flexDirection:'row',
  },
  avatar:{
    flexDirection: 'column',
    justifyContent:'flex-start',
  },
  avatar_img:{
    width:50,
    height:50,
    borderRadius:25,
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
    marginLeft:20,

  },
  comment_header:{
    flexDirection:'row',
    justifyContent: "space-between",
  },
  comment_body:{
    paddingVertical:20
  },
  comment_botton:{
    flexDirection:'row',
    justifyContent:'flex-end'
  },
  button_like:{

  },
  button_comment:{

  }
});