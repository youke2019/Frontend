
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    PixelRatio
    } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import User from '../pages/User';
import Main from '../pages/Main';

export default class Navbar extends Component {
  render() {
    return (
        <View style={styles.navbar}>
          <TouchableOpacity
              style={styles.button}
               onPress ={()=>{this.props.navigation.navigate('Main')}}
          >
            <Text style = {styles.instructions}>主页</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.button}
              onPress ={()=>{alert("课程库")}}
          >
            <Text style = {styles.instructions}>课程库</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.button}
              onPress ={()=>{alert("课程表")}}
          >
            <Text style = {styles.instructions}>课程表</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.button}
              onPress ={()=>{alert("精彩瞬间")}}
          >
            <Text style = {styles.instructions}>精彩瞬间</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.button}
              onPress ={()=>{this.props.navigation.navigate('User')}}
          >
            <Text style = {styles.instructions}>我的</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  navbar:{
    position:'absolute',
    bottom:0,
    flexDirection: 'row',
    justifyContent:'space-between'
    },
  button:{
    height:40,
    width:70,
    borderRadius:20,
    overflow:'hidden'
  }
});
