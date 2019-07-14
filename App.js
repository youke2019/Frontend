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
    Home,
    Profile,
    Course,
    Login,
    Detail,
    Classes,
    Map,
} from './src/pages'
import { Provider } from 'react-redux'
import {createStore} from 'redux'
import {combinedReducer} from './src/redux/reducers'
import initialState from './src/redux/state'
import ProfileSetting from './src/pages/ProfileSetting'

const store = createStore(combinedReducer,initialState)



const CourseNavigator = createStackNavigator({
    Search: {
        screen: Course
    },
    Detail:{
        screen: Detail,
    }
})


const ProfileNavigator = createStackNavigator({
    Profile : {screen: Profile},
    ProfileSetting :{
        screen: ProfileSetting,
    },
})
const TabNavigator = createBottomTabNavigator({
    Home: { screen: Home },
    Course: CourseNavigator,
    Classes: { screen: Classes },
    Map: { screen: Map},
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
        <SimpleApp uriPrefix={prefix} />
    </Provider>
);

export default MainApp;