/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import {Home, Profile} from './src/pages'
import { Provider } from 'react-redux'
import {createStore} from 'redux'
import {combinedReducer} from './src/redux/reducers'

const store = createStore(combinedReducer)

const TabNavigator = createBottomTabNavigator({
  Home: { screen: Home },
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