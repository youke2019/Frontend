import React from 'react';
import Profile from '../src/pages/Profile';

import renderer from 'react-test-renderer';
import {createStore} from "redux";
import {combinedReducer} from "../src/redux/reducers";
import initialState from "../src/redux/state";
import {Provider} from "react-redux";

const store = createStore(combinedReducer,initialState)

test('renders correctly', () => {
    const tree = renderer.create(
        <Provider store={store}>
            <Profile />
        </Provider>
        ).toJSON()
    expect(tree).toMatchSnapshot()
});
