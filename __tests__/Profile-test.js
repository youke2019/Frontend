import React from 'react';
import Profile from '../src/pages/Profile';
import renderer from 'react-test-renderer';
import {createStore} from "redux";
import {combinedReducer} from "../src/redux/reducers";
import {Provider} from "react-redux";
import {configure, shallow} from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";

configure({adapter: new Adapter()})
const initialState = {
    user_info: {
        id: "30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A",
    },
    course_list: null,
    login_ready:false,
}
const store = createStore(combinedReducer,initialState)

test('renders profile page correctly', () => {
  const tree = renderer.create(
        <Provider store={store}>
            <Profile />
        </Provider>
        ).toJSON()
    expect(tree).toMatchSnapshot()
});
const navigationMock = {
    state: {
        params:{

        }
    },
    addListener: jest.fn(()=>{}),
    navigate: jest.fn(()=>{})
}
describe("<Profile/> component",()=>{
    const wrapper = shallow(
        <Profile store = {store} navigation = {navigationMock} />
    );
    const instance = wrapper.dive().dive().instance();
    it("can navigate to multiple pages",()=>{
        instance.gotoProfileSetting();
        instance.gotoAbout();
    })
})