import React from 'react';
import Home from '../src/pages/Home';
import renderer from 'react-test-renderer';
import { createStore } from 'redux'
import { combinedReducer } from '../src/redux/reducers'
import { configure, shallow,mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16/build'
configure({adapter: new Adapter()})
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

jest.mock("../src/utils/LocalStorage.js")
jest.mock("../src/utils/DataRequest.js")
test('renders home page correctly', (done) => {
    const tree = renderer.create(<Home store={store}/>).toJSON();
    setTimeout(()=>{
        expect(tree).toMatchSnapshot();
        done();
    },1000)
});
describe("<Home/> Page",()=>{
    const wrapper = shallow( <Home store={store} navigation ={navigationMock}/> ).dive().dive()
    const instance = wrapper.instance();
    it("will change recommend courses when click",(done)=>{
        instance.changePatch();
        wrapper.setState({patchNum:9})/* next patch will be zero*/
        instance.changePatch();
        setTimeout(()=>{done();},100) /*wait for async to end*/
    })
    it("will loadData when Mount",(done)=>{
        instance.componentDidMount();
        setTimeout(()=>{done();},100) /*wait for async to end*/
    })
})

describe("<Home/> Page-1",()=>{
    const wrapper = shallow( <Home store={store} navigation ={navigationMock}/> ).dive().dive()
    const instance = wrapper.instance()
    it("can navigate when click",(done)=>{
        instance.gotoDetail()
        instance.componentDidMount();
        setTimeout(()=>{
            wrapper.find(".recommend_0").simulate('press')
            setTimeout(()=>{done();},100)
        },1000) /*wait for async to end*/
    })
})
