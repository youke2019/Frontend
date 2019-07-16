import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from 'axios';
import { ShadowedTitle } from './ShadowedTitle'
import CommentItem from './CommentItem'
import { Button } from 'react-native-elements'

const Tag = (props) =>{
  return(
    <ImageBackground
      style = {styles.tag_style}
      imageStyle={{resizeMode: 'stretch'}}
      source={{uri:'tag'}}
    >
      <Text> {props.text}</Text>
    </ImageBackground>
  )
}

class CommentAbstractTitle extends React.Component{
    render () {
      const {tags = ["水课","给分很高","老师很吵","fnu#&2G"]} = this.props;
      return(
        <View style = {styles.header_container}>
          <ShadowedTitle text={"评论"}  uri ={"comment"}/>
          {
            tags.map((tag,index) =>
              <Tag text = {tag} key={index} style = {styles.tag_text}/>)
          }
        </View>
      )
    }
}
export default class CommentAbstract extends React.Component{
  state ={
    comments: [],
  }
  componentDidMount () {
    axios({
      method: 'get',
      url: baseUrl + "/courses/comments/sortbycourseid",
      params:{
        course_id:this.props.course_id,
      }
    }).then(response=>{
      console.log(response.data)
      this.setState({
        comments: response.data
      });
    })
  }
  onPressButton =()=>{
    console.log("press")
  }
  render() {
    const firstComm = this.state.comments.length === 0 ? null : this.state.comments[0];
    const testComm =  {
      course_comment_id: 1,
      course_id:'SE101',
      course_comment_time:"2019-7-16",
      course_comment_content: "H7dfghgfdsdfI2K好啊，我很同意❤",
      user_id: 79832,
      isbanned: false,
      course_comment_praise_point: 1432851621,
    };
    return(
      <View style = {styles.container}>
        <CommentAbstractTitle/>

        <View style = {styles.first_comm}>
          <CommentItem comment_info={testComm} />
        </View>

        <View style = {styles.button_container}>
          <TouchableOpacity
            onPress={this.onPressButton}
            style = {styles.button_touchable}
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
  first_comm:{
    marginLeft:20
  },
  button_text:{
    color:"#ff812e",
    textAlign: 'center',
  },
  button_touchable:{
    borderRadius:20,
    paddingHorizontal:50,
    paddingVertical:5,
    backgroundColor:'#200948'
  },
  button_container:{
    flexDirection: 'row',
    justifyContent:'center',
  },
  header_container:{
    flexDirection:'row',
    alignItems:'center',
    flexWrap:'wrap',
  },
  tag_style:{
    paddingHorizontal: 5,
    marginHorizontal:5,
  },
  tag_text:{
    textAlign:"center",
  },
  container:{

  }

})