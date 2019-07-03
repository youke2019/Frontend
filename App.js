/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Yoke - 有课</Text>
        <Text style={styles.instructions}>——上海交通大学课程分享平台</Text>
        <View style={styles.navbar}>
          <TouchableOpacity
              style={styles.button}
              onPress ={()=>{alert("主页")}}
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
              onPress ={()=>{alert("我的")}}
          >
            <Text style = {styles.instructions}>我的</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    marginBottom: 5,
  },
  navbar:{
    position:'absolute',
    buttom:0,
    flexDirection: 'row',
    justifyContent:'space-between'
    },
  button:{
    height:40,
    width:100,
    borderRadius:20,
    justifyContent:'center.',
    overflow:'hidden'
  }
});
