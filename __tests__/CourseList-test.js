import React from 'react'
import CourseList from '../src/components/CourseList'
import Adapter from 'enzyme-adapter-react-16'
import {shallow,mount,configure} from 'enzyme'
import renderer from 'react-test-renderer'
import {Provider} from "react-redux"
import {createStore} from "redux"
import {combinedReducer} from "../src/redux/reducers"
import initialState from "../src/redux/state"
import {mockState} from "../src/redux/state";

configure({adapter: new Adapter()})

let store = createStore(combinedReducer,initialState)

test('render an empty CourseList', () => {
    const tree = renderer.create(
        <Provider store={store}>
            <CourseList/>
        </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
})

store = createStore(combinedReducer,mockState)
test('render normal CourseList', () => {
    const tree = renderer.create(
        <Provider store={store}>
            <CourseList/>
        </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
})

test('test function onClick', () => {
    const navigation={
        navigate : jest.fn(() => {})
    }

    const wrapper = mount(
        <Provider store={store}>
            <CourseList
                navigation={navigation}
            />
        </Provider>
    )

    wrapper.find('TouchableOpacity').at(0).props().onPress()
    expect(navigation.navigate).toHaveBeenCalled()
})