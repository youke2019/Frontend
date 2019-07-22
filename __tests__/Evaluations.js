import React from 'react'
import renderer from 'react-test-renderer'
import {shallow, mount, render, configure} from 'enzyme'
import Evaluations from '../src/pages/Evaluations'
import Adapter from "enzyme-adapter-react-16/build"
import {createStore} from "redux";
import {combinedReducer} from "../src/redux/reducers";

configure({adapter: new Adapter()})

jest.mock('axios')
global.baseUrl = 'baseUrl'

let callback=jest.fn()

const navigation = {
    state:{
        params:{
            course_info:{
                course_id: "test",
            }
        }
    },
    navigate: jest.fn(()=>{}),
    addListener: jest.fn((type,func)=>{
        callback = func
    }),
}

const testInitialState = {
    user_info: {
        id: 'testId'
    },
    course_list: null
}

const errorInitialState = {
    user_info: {
        id: 'errorId'
    },
    course_list: null
}

const store = createStore(combinedReducer,testInitialState)
const errorStore = createStore(combinedReducer,errorInitialState)

describe('functions', () => {
    let wrapper = shallow(
        <Evaluations
            store={store}
            navigation={navigation}
        />
    )

    wrapper = wrapper.dive().dive()
    expect(navigation.addListener).toHaveBeenCalled()

    it('getEvaluations() normal', (done) => {
        const promise = new Promise(
            function (resolve, reject)
            {resolve('success')})
        promise
            .then(data=>{
                expect(wrapper.instance().state.evaluations).toHaveLength(1)
                done()
            })
            .catch(err=>{console.log(err)})
    })

    it('changeCardScroll() normal', (done) => {
        wrapper.setState({
            cardScrollEnable: true
        })
        wrapper.instance().changeCardScroll()
        const promise = new Promise(
            function (resolve, reject)
            {resolve('success')})
        promise
            .then(data=>{
                expect(wrapper.instance().state.cardScrollEnable).toBe(false)
                done()
            })
            .catch(err=>{console.log(err)})
    })

    it('postEvaluation()', () => {
        wrapper.instance().postEvaluation()
        expect(navigation.navigate).toHaveBeenCalled()
    })

    it('callback()', () => {
        callback()
    })
})

test('renders Evaluations page correctly', (done) => {
    let wrapper = shallow(
        <Evaluations
            store={errorStore}
            navigation={navigation}
        />
    )
    const promise = new Promise(
        function (resolve, reject)
        {resolve('success')})
    promise
        .then(data=>{
            done()
        })
        .catch(err=>{console.log(err)})
})



test('renders Evaluations page correctly', (done) => {
    const tree = renderer.create(
        <Evaluations
            store={store}
            navigation={navigation}
        />).toJSON()
    const promise = new Promise(
        function (resolve, reject)
        {resolve('success')})
    promise
        .then(data=>{
            expect(tree).toMatchSnapshot()
            done()
        })
        .catch(err=>{console.log(err)})
})