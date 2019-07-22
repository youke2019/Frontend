import renderer from 'react-test-renderer';
import Detail from '../src/pages/Detail'
import Global from '../src/Global'
import { createStore } from 'redux'
import { combinedReducer } from '../src/redux/reducers'
import { Provider } from 'react-redux'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16/build'
import Highlight from '../src/pages/Highlight'
import React from 'react'

const initialState = {
  user_info: {
    id: "30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A",
  },
  course_list: null,
  login_ready:false,
}
const store = createStore(combinedReducer,initialState)
configure({adapter: new Adapter()})

const navigationMock = {
  navigate: jest.fn(()=>{})
}

jest.mock("../src/utils/DataRequest.js")

test('renders highlight page correctly', (done) => {
  const tree = renderer.create(
    <Highlight store = {store} navigation = {navigationMock}/>
  ).toJSON();
  const tree_err = renderer.create(
    <Highlight store = {store} navigation = {navigationMock}/>
  ).toJSON();
  setTimeout(()=>{
    expect(tree).toMatchSnapshot();
    expect(tree_err).toMatchSnapshot();
    done();
  },2000)
});

describe("<Highlight /> component",()=>{
  const wrapper = shallow(
    <Highlight store = {store} navigation = {navigationMock} />
  );
  const instance = wrapper.dive().dive().instance();
  console.log(instance)
  it("can navigate to multiple pages",()=>{
      instance.newHighlight();
      instance.refresh();
  })
})