import React from 'react'
import {
  View,
  FlatList,
  StyleSheet,
} from "react-native";
import StackNavBar from '../components/StackNavBar'
import CommentItem from '../components/CommentItem'
import axios from 'axios'
import { CommentAbstractTitle } from '../components/CommentAbstract'
export default class Comment extends React.Component{
  state={
    comments:[],
  }
  componentWillMount () {
      this.getCommentData();
  }
  getCommentData =()=>{
    console.log(this.props.navigation.state.params)
    axios({
      method: 'get',
      url: baseUrl + "/courses/comments/find",
      params:{
        course_id:this.props.navigation.state.params.course_id,
      }
    }).then(response=>{
      console.log(response.data)
      this.setState({
        comments: response.data
      })
    }).catch(err=>{
      console.log(err);
    });
  }
  render () {
    const {comments} = this.state;
    return(
      <View style={styles.container}>
          <StackNavBar
            navigation={this.props.navigation}
          />
          <View style={styles.title}>
             <CommentAbstractTitle />
          </View>
          <View style = {styles.comment_list}>
          <FlatList
           data={comments}
           renderItem={({item,index})=>
              <View>
                  <CommentItem comment_info = {item} key={index}/>
                  <View style = {styles.divider}/>
              </View>
             }
            keyExtactor={(item)=>item.comment_id}
         />
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    paddingTop:15,
    flexDirection:'column'
  },
  divider:{
    marginVertical:3,
  },
  comment_list:{
    paddingTop:0,
    marginLeft:30,
  },
  title:{
    marginTop:25,
  }
})