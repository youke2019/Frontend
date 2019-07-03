/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 *
 @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import User from './src/pages/User';
import Main from './src/pages/Main'
import Navbar from './src/component/Navbar'


const RootStack = createStackNavigator({
  Main : Main,
  User : User
},{
  initialRouteName : 'Main'
})
export default class App extends Component {
  render() {
    return (
      <RootStack/>
    );
  }
}

const styles = StyleSheet.create({

});
