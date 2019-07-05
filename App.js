/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import {Home, Profile, Course} from './src/pages'
import { Provider } from 'react-redux'
import {createStore} from 'redux'
import {combinedReducer} from './src/redux/reducers'
import Global from './src/Global'

const store = createStore(combinedReducer)

const TabNavigator = createBottomTabNavigator({
    Home: { screen: Home },
    Course: { screen: Course },
    Profile: {
      screen: Profile,
      path: 'profile'
  },
});

const SimpleApp = createAppContainer(TabNavigator);

const prefix = 'yoke://';

const MainApp = () => (
    <Provider store={store}>
        <SimpleApp uriPrefix={prefix} />
    </Provider>
);

export default MainApp;