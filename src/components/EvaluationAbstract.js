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

class QAAbstractTitle extends React.Component{
    render () {
      const {tags = ["高分课程","值得一选"]} = this.props;
      return(
        <View style = {styles.header_container}>
          <ShadowedTitle text={"评测"}  uri ={"wenda"}/>
          {
            tags.map((tag,index) =>
              <Tag text = {tag} key={index} style = {styles.tag_text}/>)
          }
        </View>
      )
    }
}
export default class EvaluationAbstract extends React.Component{
  state ={
    comments: [],
  }
  componentDidMount () {
  }
  render() {

    return(
      <View style = {styles.container}>
        <QAAbstractTitle/>
        <View style = {styles.first_comm}>
          <Text > EV</Text>
        </View>

        <View style = {styles.button_container}>
          <TouchableOpacity
            onPress={this.props.onGotoEvaluationPage}
            style = {styles.button_touchable}
            activeOpacity={0.3}
          >
            <Text
              style={styles.button_text}
            >更多评测</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  first_comm:{
    marginLeft: 20,
  },
  button_text:{
    color:"#ff812e",
    textAlign: 'center',
  },

  button_touchable: {
    borderRadius: 20,
    paddingHorizontal: 55,
    paddingVertical: 5,
    borderWidth:0.5,
    borderColor:'orange',
    backgroundColor: 'white'
  },
  button_container:{
    marginTop:10,
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
    borderTopWidth:15,
    borderTopColor:'whitesmoke',
    marginBottom:50,
  }

})