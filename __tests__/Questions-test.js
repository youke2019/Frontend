import React from 'react'
import renderer from 'react-test-renderer'
import {shallow, mount, render, configure} from 'enzyme'
import { createStore } from 'redux'
import { combinedReducer } from '../src/redux/reducers'
import { Provider } from 'react-redux'
import Questions from '../src/pages/Questions'
import Adapter from "enzyme-adapter-react-16/build"

configure({adapter: new Adapter()})

const testInitialState = {
    user_info: {
        id: 'testLzw'
    },
    course_list: null
}

const store = createStore(combinedReducer,testInitialState)

jest.mock('axios')
global.baseUrl = 'baseUrl'

describe('functions', () => {
    let wrapper = shallow(
            <Questions
                store={store}
                navigation={{
                    state:{
                        params:{
                            course_info:{
                                course_id: '123'
                            }
                        }
                    }
                }}
            />
    )

    wrapper = wrapper.dive().dive()

    it('normal refresh()', (done) => {
        const promise = new Promise(
            function (resolve, reject)
            {resolve('success')})
        promise
            .then(data=>{
                expect(wrapper.state('questions')).toHaveLength(1)
                done()
            })
            .catch(err=>{console.log(err)})
    })


    it('hideInput()', () => {
        wrapper.setState({
            question_visible: true
        })
        wrapper.instance().hideInput()
        expect(wrapper.state('question_visible')).toBe(false)
    })

    it('displayInput()', () => {
        wrapper.setState({
            question_visible: false
        })
        wrapper.instance().displayInput()
        expect(wrapper.state('question_visible')).toBe(true)
    })

    it('comeUpQuestion() normal', (done) => {
        wrapper.setState({
            question_visible: true
        })
        wrapper.instance().comeUpQuestion()

        const promise = new Promise(
            function (resolve, reject)
            {resolve('success')})
        promise
            .then(data=>{
                expect(wrapper.state('question_visible')).toBe(false)
                done()
            })
            .catch(err=>{console.log(err)})
    })

    it('comeUpQuestion() abnormal', (done) => {
        wrapper.setState({
            question_visible: true
        })
        wrapper.instance().comeUpQuestion('error')

        const promise = new Promise(
            function (resolve, reject)
            {resolve('success')})
        promise
            .then(data=>{
                expect(wrapper.state('question_visible')).toBe(true)
                done()
            })
            .catch(err=>{console.log(err)})
    })

    it('refresh() error', (done) => {
        global.baseUrl = 'error'
        wrapper.setState({
            questions: []
        })
        wrapper.instance().flush()
        expect(wrapper.state('questions')).toHaveLength(0)

        const promise = new Promise(
            function (resolve, reject)
            {resolve('success')})
        promise
            .then(data=>{
                global.baseUrl = 'baseUrl'
                done()
            })
            .catch(err=>{console.log(err)})
    })
})

test('renders QuestionCard page correctly', () => {
    const tree = renderer.create(
        <Provider store={store}>
            <Questions
                navigation={{
                    state:{
                        params:{
                            course_info:{
                                course_id: '123'
                            }
                        }
                    }
                }}
            />
        </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});