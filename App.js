/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 *
 @flow
 */

import React, {Component} from 'react';
<<<<<<< HEAD
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Login from "./src/pages/Login"

class HomeScreen extends React.Component {
  render() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Home!</Text>
        </View>
    );
  }
}

class ProfileScreen extends React.Component {
  render() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Login/>
        </View>
=======
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
>>>>>>> 8e7188a37f1e484f891e2e0bb0869bfaace6df9f
    );
  }
}

<<<<<<< HEAD
const TabNavigator = createBottomTabNavigator({
  Home: { screen: HomeScreen },
  Profile: {
      screen: ProfileScreen,
      path: 'profile'
  },
=======
const styles = StyleSheet.create({

>>>>>>> 8e7188a37f1e484f891e2e0bb0869bfaace6df9f
});

const SimpleApp = createAppContainer(TabNavigator);

const prefix = 'yoke://';

const MainApp = () => <SimpleApp uriPrefix={prefix} />;

export default MainApp;