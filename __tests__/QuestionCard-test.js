import React from 'react'
import renderer from 'react-test-renderer'
import {shallow, mount, render, configure} from 'enzyme'
import QuestionCard from '../src/components/QuestionCard'
import Adapter from "enzyme-adapter-react-16/build"


configure({adapter: new Adapter()})

const question = {
        "question_id": 17,
        "user_id": "01231",
        "course_id": "66974",
        "question_content": "老师好看吗",
        "question_time": "2019-07-18 20:44:34",
        "question_isbanned": false,
        "question_praise_point": 2,
        "courseAnswerList": [
            {
                "answer_id": 33,
                "question_id": 17,
                "user_id": "1A7A1F80-59D0-4E8C-B4C6-AAAFFC606120",
                "answer_content": "杜鹃老师很好看",
                "answer_time": "2019-07-18 22:20:42",
                "answer_isbanned": false,
                "answer_praise_point": 0,
                "current_user_praise": false,
                "courseAnswerPraiseList": []
            },
            {
                "answer_id": 37,
                "question_id": 17,
                "user_id": "01231",
                "answer_content": "没用的问题",
                "answer_time": "2019-07-19 11:06:35",
                "answer_isbanned": false,
                "answer_praise_point": 0,
                "current_user_praise": false,
                "courseAnswerPraiseList": []
            },
            {
                "answer_id": 38,
                "question_id": 17,
                "user_id": "01231",
                "answer_content": "楼上说啥呢",
                "answer_time": "2019-07-19 13:22:44",
                "answer_isbanned": false,
                "answer_praise_point": 0,
                "current_user_praise": false,
                "courseAnswerPraiseList": []
            }
        ],
        "courseQuestionPraiseList": [
            {
                "question_praise_id": 1757,
                "question_id": 17,
                "user_id": "1A7A1F80-59D0-4E8C-B4C6-AAAFFC606120"
            },
            {
                "question_praise_id": 1758,
                "question_id": 17,
                "user_id": "01231"
            }
        ],
        "current_user_praise": false
}

const flush = jest.fn(() => {})
jest.mock('axios')
global.baseUrl = 'baseUrl'

describe('functions', () => {
    let wrapper = shallow(
        <QuestionCard
            onAnswer={flush}
            QandA = {question}
        />)

    wrapper.setProps({
        QandA:question
    })

    it('displayInput()', () => {
        expect(wrapper.instance().state.answer_visible).toBe(false)
        wrapper.instance().displayInput()
        expect(wrapper.instance().state.answer_visible).toBe(true)
    })

    it('hideInput()', () => {
        expect(wrapper.instance().state.answer_visible).toBe(true)
        wrapper.instance().hideInput()
        expect(wrapper.instance().state.answer_visible).toBe(false)
    })

    it('useful()', (done) => {
        expect(wrapper.instance().props.QandA.current_user_praise).toBe(false)
        expect(wrapper.instance().props.QandA.question_praise_point).toBe(2)
        wrapper.instance().useful()

        const promise = new Promise(
            function (resolve, reject)
            {resolve('success')})
        promise
            .then(data=>{
                expect(wrapper.instance().props.QandA.current_user_praise).toBe(true)
                expect(wrapper.instance().props.QandA.question_praise_point).toBe(3)

                wrapper.instance().useful()

                const promise = new Promise(
                    function (resolve, reject)
                    {resolve('success')})
                promise
                    .then(data=>{
                        expect(wrapper.instance().props.QandA.current_user_praise).toBe(false)
                        expect(wrapper.instance().props.QandA.question_praise_point).toBe(2)
                        done()
                    })
                    .catch(err=>{console.log(err)})
            })
            .catch(err=>{console.log(err)})
    })

    it('praise()', (done) => {
        expect(wrapper.instance().props.QandA.courseAnswerList[0].current_user_praise).toBe(false)
        expect(wrapper.instance().props.QandA.courseAnswerList[0].answer_praise_point).toBe(0)
        wrapper.instance().praise(0)

        const promise = new Promise(
            function (resolve, reject)
            {resolve('success')})
        promise
            .then(data=>{
                expect(wrapper.instance().props.QandA.courseAnswerList[0].current_user_praise).toBe(true)
                expect(wrapper.instance().props.QandA.courseAnswerList[0].answer_praise_point).toBe(1)

                wrapper.instance().praise(0)

                const promise = new Promise(
                    function (resolve, reject)
                    {resolve('success')})
                promise
                    .then(data=>{
                        expect(wrapper.instance().props.QandA.courseAnswerList[0].current_user_praise).toBe(false)
                        expect(wrapper.instance().props.QandA.courseAnswerList[0].answer_praise_point).toBe(0)
                        done()
                    })
                    .catch(err=>{console.log(err)})
            })
            .catch(err=>{console.log(err)})
    })

    it('praise() annoymous', (done) => {
        expect(wrapper.instance().props.QandA.courseAnswerList[0].current_user_praise).toBe(false)
        expect(wrapper.instance().props.QandA.courseAnswerList[0].answer_praise_point).toBe(0)
        wrapper.find('TouchableOpacity').at(1).props().onPress()

        const promise = new Promise(
            function (resolve, reject)
            {resolve('success')})
        promise
            .then(data=>{
                expect(wrapper.instance().props.QandA.courseAnswerList[0].current_user_praise).toBe(true)
                expect(wrapper.instance().props.QandA.courseAnswerList[0].answer_praise_point).toBe(1)
                done()
            })
            .catch(err=>{console.log(err)})
    })

    it('answer() normal', (done) => {
        wrapper.setState({
            answer_visible: true
        })
        expect(wrapper.instance().state.answer_visible).toBe(true)
        wrapper.instance().answer()

        const promise = new Promise(
            function (resolve, reject)
            {resolve('success')})
        promise
            .then(data=>{
                expect(wrapper.instance().state.answer_visible).toBe(false)
                expect(flush).toHaveBeenCalled()
                done()
            })
            .catch(err=>{console.log(err)})
    })

    it('answer() abnormal', (done) => {
        wrapper.setState({
            answer_visible: true
        })
        expect(wrapper.instance().state.answer_visible).toBe(true)
        wrapper.instance().answer('error')

        const promise = new Promise(
            function (resolve, reject)
            {resolve('success')})
        promise
            .then(data=>{
                expect(wrapper.instance().state.answer_visible).toBe(true)
                done()
            })
            .catch(err=>{console.log(err)})
    })

    console.log(wrapper.instance())
})

test('renders QuestionCard page correctly', () => {
    const tree = renderer.create(
        <QuestionCard
        onAnswer={flush}
        QandA = {question}
        />).toJSON();
    expect(tree).toMatchSnapshot();
});