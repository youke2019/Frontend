/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { createBottomTabNavigator, createAppContainer, createSwitchNavigator,createStackNavigator } from 'react-navigation';
import {Home, Profile, Course, Login, Detail, Classes, Map} from './src/pages'
import { Provider } from 'react-redux'
import {createStore} from 'redux'
import {combinedReducer} from './src/redux/reducers'
import initialState from './src/redux/state'
import ProfileSetting from './src/pages/ProfileSetting'

const store = createStore(combinedReducer,initialState)

const Cour = createStackNavigator({
    RootNavigator:{
        screen: Course
    },
    Detail:{
        screen: Detail
    }
})


const ProfileNavigator = createStackNavigator({
    Profile : {screen: Profile},
    ProfileSetting :{ screen: ProfileSetting},
})
const TabNavigator = createBottomTabNavigator({
    Home: { screen: Home },
    Course: { screen: Cour},
    Classes: { screen: Classes },
    Map: { screen: Map},
    Profile: { screen: ProfileNavigator },
});

const SwitchNavigator = createSwitchNavigator({
    Login: { screen: Login },
    App: TabNavigator
})

const SimpleApp = createAppContainer(SwitchNavigator);

const prefix = 'yoke://';

const MainApp = () => (
    <Provider store={store}>
        <SimpleApp uriPrefix={prefix} />
    </Provider>
);

export default MainApp;