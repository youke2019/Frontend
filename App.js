/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { createBottomTabNavigator, createAppContainer, createSwitchNavigator,createStackNavigator } from 'react-navigation';
import {Home, Profile, Course, Login, Detail, Classes} from './src/pages'
import { Provider } from 'react-redux'
import {createStore} from 'redux'
import {combinedReducer} from './src/redux/reducers'
import initialState from './src/redux/state'

const store = createStore(combinedReducer,initialState)

const Cour = createStackNavigator({
    RootNavigator:{
        screen: Course
    },
    Detail:{
        screen: Detail
    }
})

const TabNavigator = createBottomTabNavigator({
    Home: { screen: Home },
    Course: { screen: Cour},
    Profile: { screen: Profile },
    Classes: { screen: Classes }
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