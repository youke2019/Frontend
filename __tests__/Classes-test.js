import Classes from '../src/pages/Classes'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import React from 'react'
import { createStore } from 'redux'
import { combinedReducer } from '../src/redux/reducers'
import initialState from '../src/redux/state'
//import Global from '../src/Global'
const store = createStore(combinedReducer,initialState)

jest.mock("../src/utils/LocalStorage.js")

test('renders classes page correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <Classes />
    </Provider>
  ).toJSON()
  expect(tree).toMatchSnapshot();
 // setTimeout(()=> {
  //  done();
  //},1000);
});
