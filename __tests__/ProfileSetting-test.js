import React from 'react';
import renderer from 'react-test-renderer';
import {createStore} from "redux";
import {combinedReducer} from "../src/redux/reducers";
import {Provider} from "react-redux";
import ProfileSetting from "../src/pages/ProfileSetting";
import Adapter from 'enzyme-adapter-react-16'
import {shallow,mount,configure} from 'enzyme'
configure({adapter: new Adapter()});

const initialState = {
    user_info: {
        id: "30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A",
    },
    course_list: null,
    login_ready:false,
}

const store = createStore(combinedReducer,initialState)

const  navigationMock = {
    navigate: jest.fn(()=>{})
}

const flush = jest.fn(() => {})
jest.mock('axios')
global.baseUrl = 'baseUrl'
jest.mock("../src/redux/actions.js")
jest.mock("../src/utils/DataRequest.js")
jest.mock("../src/utils/ErrorAlert.js")
jest.mock('react-native-image-crop-picker')
test('renders profile page correctly', () => {
  let tree = renderer.create(
        <Provider store={store}>
            <ProfileSetting navigation={navigationMock}/>
        </Provider>
        ).toJSON()
    expect(tree).toMatchSnapshot()
});
describe('functionality', () => {

    let wrapper = shallow(<ProfileSetting store={store} navigation = {navigationMock}/>)
    let instance = wrapper.dive().dive().instance()
    it('update nickname function1', (done) => {
        jest.mock('axios')
        global.baseUrl = 'baseUrl'
        instance.updateNickname('花')
        const promise = new Promise(
            function (resolve, reject)
            {resolve('success')})
        promise
            .then(data=>{
                console.log(wrapper.props())
                done()
            })
            .catch(data=>{done()})

    })
    it('update nickname function2', (done) => {
        jest.mock('axios')
        global.baseUrl = 'baseUrl'
        instance.updateNickname('三个代表')
        const promise = new Promise(
            function (resolve, reject)
            {resolve('success')})
        promise
            .then(data=>{
                console.log(wrapper.props())
                done()
            })
            .catch(data=>{done()})

    })
    it("can navigate to multiple pages",()=>{
        instance.pressNickname();
    })
    it("modify avator function",()=>{
        instance.modifyAvatar()
    })
})
