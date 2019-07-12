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
    createDrawerNavigator
} from 'react-navigation';
import {
    Home,
    Profile,
    Course,
    Login,
    Detail,
    Classes,
    Map,
    Drawer
} from './src/pages'
import { Provider } from 'react-redux'
import {createStore} from 'redux'
import {combinedReducer} from './src/redux/reducers'
import initialState from './src/redux/state'

const store = createStore(combinedReducer,initialState)

const DrawerNavigator = createDrawerNavigator({
    Search: {
        screen: Course
    },
    Drawer: {screen: Drawer}
})

const CourseNavigator = createStackNavigator({
    RootNavigator: DrawerNavigator,
    Detail:{
        screen: Detail,

    }
})

const TabNavigator = createBottomTabNavigator({
    Home: { screen: Home },
    Course: CourseNavigator,
    Classes: { screen: Classes },
    Map: { screen: Map},
    Profile: { screen: Profile },
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
        <SimpleApp uriPrefix={prefix} />
    </Provider>
);

export default MainApp;