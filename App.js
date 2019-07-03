/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
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
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Home: { screen: HomeScreen },
  Profile: {
      screen: ProfileScreen,
      path: 'profile'
  },
});

const SimpleApp = createAppContainer(TabNavigator);

const prefix = 'yoke://';

const MainApp = () => <SimpleApp uriPrefix={prefix} />;

export default MainApp;