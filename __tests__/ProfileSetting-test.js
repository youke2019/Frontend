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
    state: {
        params:{
        }
    },
    addListener: jest.fn(()=>{}),
    navigate: jest.fn(()=>{})
}

const flush = jest.fn(() => {})
jest.mock('axios')
global.baseUrl = 'baseUrl'

test('renders profile page correctly', () => {
  let tree = renderer.create(
        <Provider store={store}>
            <ProfileSetting />
        </Provider>
        ).toJSON()
    expect(tree).toMatchSnapshot()
});

describe('functionality', () => {
    let wrapper = shallow(<ProfileSetting store={store} navigation = {navigationMock}/>).dive().dive()

    it('update nickname function', (done) => {
        jest.mock('axios')
        global.baseUrl = 'baseUrl'
        wrapper.instance().updateNickname('花')
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
        wrapper.instance.pressNickname();
    })
})
