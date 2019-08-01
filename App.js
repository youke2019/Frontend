/**
 * Yoke
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import {Image, StyleSheet} from 'react-native'
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
  NewEvaluation,
  Sorting,
  Edit,
  Setting,
  NewComment, SortClassesDisplay
} from './src/pages'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { combinedReducer } from './src/redux/reducers'
import initialState from './src/redux/state'
import ProfileSetting from './src/pages/ProfileSetting'
import About from './src/pages/About'
import {StatusBar,View} from "react-native";
import StackNavBar from "./src/components/StackNavBar";

const store = createStore(combinedReducer,initialState)
const DetailNavigator=createStackNavigator({
  Detail: {
    screen: Detail,
    navigationOptions: ({ navigation }) => ({
      header: () => {
        return (<StackNavBar
          navigation={navigation}
          title={'课程'}
        />)},
    }),
  },
  Comments: {
    screen: Comments,
    navigationOptions: ({ navigation }) => ({
      header: () => {
        return (<StackNavBar
          navigation={navigation}
          title={'评论'}
        />)},
    }),
  },
  Questions: {
    screen: Questions,
    navigationOptions: { header: null }
  },
  Evaluations:{
    screen:Evaluations,
    navigationOptions: { header: null }
  },
  NewEvaluation:{
    screen:NewEvaluation,
    navigationOptions: { header: null }
  },
  Sorting:{
    screen:Sorting,
  },
  NewComment:{
    screen: NewComment,
  },
  SortClassesDisplay:{
    screen:SortClassesDisplay
  }
})

const CourseNavigator = createStackNavigator({
  Search: {
    screen: Course,
    navigationOptions: { header: null }
  },
  Detail:{
    screen:DetailNavigator,
    navigationOptions: { header: null }
  }
})

const ClassesNavigator = createStackNavigator({
  Classes: {
    screen: Classes,
    navigationOptions: { header: null }
  },
  Map: {
    screen: Map,
    navigationOptions: { header: null }
  },
})
const HomeNavigator = createStackNavigator({
  Home:{
    screen:Home,
    navigationOptions: { header: null }
  },
  Detail:{
    screen:DetailNavigator,
    navigationOptions: { header: null }
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
        navigationOptions: ({ navigation }) => ({
          header: () => {
            return (<StackNavBar
                    navigation={navigation}
                    title={'个人信息'}
            />)},
        }),
      },
      About:{
        screen:About,
      },
  Edit: { screen: Edit },
  Setting: { screen: Setting },
})

const TabNavigator = createBottomTabNavigator(
    {
      Home: {
        screen: HomeNavigator,
        navigationOptions: {
          tabBarLabel: '首页',
          tabBarIcon: ({focused}) => {
            if (focused)
              return (<Image style={styles.tabBarIcon} source={{uri:'tab_home_focus'}} resizeMode='stretch'/>)
            return (<Image style={styles.tabBarIcon} source={{uri:'tab_home'}} resizeMode='stretch'/>)
          }
        },
      },
      Course: {
        screen: CourseNavigator,
        navigationOptions: {
          tabBarLabel: '课程库',
          tabBarIcon: ({focused}) => {
            if (focused)
              return (<Image style={styles.tabBarIcon} source={{uri:'tab_courses_focus'}} resizeMode='stretch'/>)
            return (<Image style={styles.tabBarIcon} source={{uri:'tab_courses'}} resizeMode='stretch'/>)
          }
        },
      },
      Classes: {
        screen: ClassesNavigator,
        navigationOptions: {
          tabBarLabel: '课程表',
          tabBarIcon: ({focused}) => {
            if (focused)
              return (<Image style={styles.carryIcon} source={{uri:'tab_classes'}} resizeMode='stretch'/>)
            return (<Image style={styles.carryIcon} source={{uri:'tab_classes'}} resizeMode='cover'/>)
          }
        },
      },
      Highlight: {
        screen: HighlightNavigator,
        navigationOptions: {
            tabBarLabel: '精彩瞬间',
          tabBarIcon: ({focused}) => {
            if (focused)
              return (<Image style={styles.tabBarIcon} source={{uri:'tab_highlights_focus'}} resizeMode='stretch'/>)
            return (<Image style={styles.tabBarIcon} source={{uri:'tab_highlights'}} resizeMode='stretch'/>)
          }
        },
      },
      Profile: {
        screen: ProfileNavigator,
        navigationOptions: {
          tabBarLabel: '我',
          tabBarIcon: ({focused}) => {
            if (focused)
              return (<Image style={styles.tabBarIcon} source={{uri:'tab_profile_focus'}} resizeMode='stretch' />)
            return (<Image style={styles.tabBarIcon} source={{uri:'tab_profile'}} resizeMode='stretch'/>)
          }
        },
      },
    },
    {
      tabBarOptions:{
        showIcon: true,
        style: {
          backgroundColor: '#FFFFFF',
          height: 50
        },
        labelStyle: {
          fontSize: 12,
          color: '#000000'
        },
      }
    }
)

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
HomeNavigator.navigationOptions = ({ navigation }) => {
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

const styles = StyleSheet.create({
  tabBarIcon:{
    width:20,
    height:20,
  },
  carryIcon:{
    marginBottom: 15,
    width:50,
    height:50,
  }
})

export default MainApp