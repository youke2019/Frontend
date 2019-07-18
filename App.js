/**
 * Yoke
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    createBottomTabNavigator,
    createAppContainer,
    createSwitchNavigator,
    createStackNavigator,
} from 'react-navigation';
import {
    Comment,
    Home,
    Profile,
    Course,
    Login,
    Detail,
    Classes,
    Map,
    Questions,
    Evaluations,
} from './src/pages'
import { Provider } from 'react-redux'
import {createStore} from 'redux'
import {combinedReducer} from './src/redux/reducers'
import initialState from './src/redux/state'
import ProfileSetting from './src/pages/ProfileSetting'
import {StatusBar,View} from "react-native";

const store = createStore(combinedReducer,initialState)



const CourseNavigator = createStackNavigator({
    Search: {
        screen: Course,
        navigationOptions:{ header:null }
        },
    Detail:{
        screen: Detail,
        navigationOptions:{ header:null }
        },
    Comment:{
        screen:Comment,
        navigationOptions:{ header:null }
        },
    Questions:{
        screen:Questions,
        navigationOptions:{ header:null }
    },
    Evaluations:{
        screen:Evaluations,
        navigationOptions: {header:null}
    }
})


const ProfileNavigator = createStackNavigator({
    Profile : {
        screen: Profile,
        navigationOptions:{
            header:null,
        },
    },
    ProfileSetting :{
        screen: ProfileSetting,
    },
})
const TabNavigator = createBottomTabNavigator({
    Home: { screen: Home },
    Course: CourseNavigator,
    Classes: { screen: Classes },
    Map: { screen: Map},
    Questions: {screen: Questions},
    Evaluations: {screen:Evaluations},
    Profile: { screen: ProfileNavigator },
});

const SwitchNavigator = createSwitchNavigator({
    Login: { screen: Login },
    App: TabNavigator
})

CourseNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true
    if (navigation.state.index > 0) {
        tabBarVisible = false
    }
    return {
        tabBarVisible,
    }
}

const SimpleApp = createAppContainer(SwitchNavigator);

const prefix = 'yoke://';

const MainApp = () => (
    <Provider store={store}>
        <StatusBar
            backgroundColor='transparent'
            translucent={true}
            barStyle='dark-content'
        />
        <SimpleApp uriPrefix={prefix} />
    </Provider>
);

export default MainApp;