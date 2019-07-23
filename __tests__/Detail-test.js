import React from 'react';
import renderer from 'react-test-renderer';
import Detail from '../src/pages/Detail'
import Global from '../src/Global'
import { createStore } from 'redux'
import { combinedReducer } from '../src/redux/reducers'
import { Provider } from 'react-redux'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16/build'
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
    state: {
        params:{
            course_id: "SE101",
        }
    },
    addListener: jest.fn(()=>{}),
    navigate: jest.fn(()=>{})
}
jest.mock("../src/utils/DataRequest.js")

test('renders detail page correctly', (done) => {

    const tree = renderer.create(
      <Provider store ={store}>
        <Detail navigation = {navigationMock} />
      </Provider>
      ).toJSON();
    const tree_err = renderer.create(
      <Provider store ={store}>
          <Detail navigation = {navigationMock} />
      </Provider>
    ).toJSON();
    setTimeout(()=>{
        expect(tree).toMatchSnapshot();
        expect(tree_err).toMatchSnapshot();
        done();
    },2000)
});

describe("<Detail/> component",()=>{
    const wrapper = shallow(
        <Detail store = {store} navigation = {navigationMock} />
    );
    const instance = wrapper.dive().dive().instance();
    it("can navigate to multiple pages",()=>{
        instance.onGotoQuestionPage();
        instance.onGotoEvaluationPage();
        instance.onGotoCommentPage();
    })
})