import React from 'react';
import renderer from 'react-test-renderer';
import Detail from '../src/pages/Detail'
import Global from '../src/Global'
import { createStore } from 'redux'
import { combinedReducer } from '../src/redux/reducers'
import initialState from '../src/redux/state'
import { Provider } from 'react-redux'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16/build'
const store = createStore(combinedReducer,initialState)
configure({adapter: new Adapter()})

const navigationMock = {
    state: {
        params:{
            course_id: "SE101",
        }
    },
    navigate: jest.fn(()=>{})
}
jest.mock("../src/utils/DataRequest.js")

test('renders detail page correctly', () => {

    const tree = renderer.create(
      <Provider store ={store}>
        <Detail navigation = {navigationMock} />
      </Provider>
      ).toJSON();
    expect(tree).toMatchSnapshot();
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