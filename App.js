/**
 * Yoke
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import {
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from 'react-navigation'
import {
  Comments,
  Home,
  Profile,
  Course,
  Login,
  Detail,
  Classes,
  Map,
  Questions,
  Evaluations,
  Highlight,
  NewHighlight,
  NewEvaluation, Sorting
} from './src/pages'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { combinedReducer } from './src/redux/reducers'
import initialState from './src/redux/state'
import ProfileSetting from './src/pages/ProfileSetting'
import {StatusBar,View} from "react-native";

const store = createStore(combinedReducer,initialState)

const CourseNavigator = createStackNavigator({
  Search: {
    screen: Course,
    navigationOptions: { header: null }
  },
  Detail: {
    screen: Detail,
    navigationOptions: { header: null }
  },
  Comments: {
    screen: Comments,
    navigationOptions: { header: null }
  },
  Questions: {
    screen: Questions,
    navigationOptions: { header: null }
  },
  Evaluations:{
    screen:Evaluations,
    navigationOptions: {header:null}
  },
  NewEvaluation:{
    screen:NewEvaluation,
    navigationOptions: {header:null}
  }
})
const HighlightNavigator = createStackNavigator({
  Highlight: {
    screen: Highlight,
    navigationOptions: {
      header: null
    }
  },
  NewHighlight: {
    screen: NewHighlight,
    navigationOptions: {
      header: null
    }
  }
})
const ProfileNavigator = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      header: null
    }
  },
  ProfileSetting: {
    screen: ProfileSetting,
  }
})

const TabNavigator = createBottomTabNavigator({

  Home: { screen: Home },
  Course: CourseNavigator,
  Classes: { screen: Classes },
  Map: { screen: Map },
  Highlight: { screen: HighlightNavigator },
  Profile: { screen: ProfileNavigator },
  Sorting:{ screen: Sorting }
})

const SwitchNavigator = createSwitchNavigator({
  Login: { screen: Login },
  App: TabNavigator
})

HighlightNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  if (navigation.state.index > 0) {
    tabBarVisible = false
  }
  return {
    tabBarVisible
  }
}
CourseNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  if (navigation.state.index > 0) {
    tabBarVisible = false
  }
  return {
    tabBarVisible
  }
}

const SimpleApp = createAppContainer(SwitchNavigator)

const prefix = 'yoke://'

const MainApp = () => (
  <Provider store={store}>
    <StatusBar
      backgroundColor='transparent'
      translucent={true}
      barStyle='dark-content'
    />
    <SimpleApp uriPrefix={prefix}/>
  </Provider>
)

export default MainApp