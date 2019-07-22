import React from 'react'
import renderer from 'react-test-renderer'
import {shallow, mount, render, configure} from 'enzyme'
import NewEvaluation from '../src/pages/NewEvaluation'
import Adapter from "enzyme-adapter-react-16/build"

configure({adapter: new Adapter()})

const navigation = {
    state:{
        params:{
            user_id: "test",
            course_info:{
                course_id: "test",
            }
        }
    },
    navigate: jest.fn(()=>{}),
    goBack: jest.fn(()=>{})
}

console.error = jest.fn()
jest.mock('axios')
global.baseUrl = 'baseUrl'

describe('functions', () => {

    let wrapper = mount(
        <NewEvaluation
            navigation={navigation}
        />)

    it('setData()', () => {
        wrapper.instance().setData('testType','testText')
        expect(wrapper.instance().state.post).toHaveProperty('testType','testText')
    })

    it('postEvaluation() abnormal', (done) => {
        wrapper.setState({
            post: {
                credit_point: -1,
                课程简述: 'testOutline',
            }
        })
        wrapper.instance().postEvaluation()
        const promise = new Promise(
            function (resolve, reject)
            {resolve('success')})
        promise
            .then(data=>{
                expect(navigation.navigate).not.toHaveBeenCalled()
                done()
            })
            .catch(err=>{console.log(err)})
    })

    it('postEvaluation() normal', (done) => {
        wrapper.setState({
            post: {
                credit_point: null,
                课程简述: null,
            }
        })

        wrapper.instance().postEvaluation()

        wrapper.setState({
            post: {
                credit_point: 8,
                课程简述: 'testOutline',
            }
        })
        wrapper.instance().postEvaluation()
        const promise = new Promise(
            function (resolve, reject)
            {resolve('success')})
        promise
            .then(data=>{
                expect(navigation.navigate).toHaveBeenCalled()
                done()
            })
            .catch(err=>{console.log(err)})
    })

    it('anonymous functions', () => {
        wrapper.find({placeholder:'输入课程简述'}).at(0).props().onChangeText('test')
        expect(wrapper.instance().state.post).toHaveProperty('课程简述','test')

        wrapper.find({placeholder:'输入考核形式'}).at(0).props().onChangeText('test')
        expect(wrapper.instance().state.post).toHaveProperty('考核形式','test')

        wrapper.find({placeholder:'输入上课自由程度'}).at(0).props().onChangeText('test')
        expect(wrapper.instance().state.post).toHaveProperty('上课自由程度','test')

        wrapper.find({placeholder:'输入课程个人体验'}).at(0).props().onChangeText('test')
        expect(wrapper.instance().state.post).toHaveProperty('课程个人体验','test')

        wrapper.find('Rating').props().onUpdate(6)
        expect(wrapper.instance().state.post).toHaveProperty('credit_point',6)

    })
})

test('renders QuestionCard page correctly', () => {
    const tree = renderer.create(
        <NewEvaluation
        />).toJSON()
    expect(tree).toMatchSnapshot();
})