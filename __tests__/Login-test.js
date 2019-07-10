import React from 'react';

import renderer from 'react-test-renderer';
import {createStore} from "redux";
import {combinedReducer} from "../src/redux/reducers";
import initialState from "../src/redux/state";
import {Provider} from "react-redux";
import Login from '../src/pages/Login'

const store = createStore(combinedReducer,initialState)

jest.mock("../src/utils/LocalStorage.js")

test('renders login page correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <Login />
    </Provider>
  ).toJSON()
  expect(tree).toMatchSnapshot()
});
