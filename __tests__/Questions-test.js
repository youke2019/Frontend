import React from 'react'
import renderer from 'react-test-renderer'
import {shallow, mount, render, configure} from 'enzyme'
import Questions from '../src/pages/Questions'
import Adapter from "enzyme-adapter-react-16/build"


configure({adapter: new Adapter()})

const questions = {
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

jest.mock('axios')
global.baseUrl = 'baseUrl'

describe('functions', () => {
    let wrapper = shallow(<Questions/>)
})

test('renders QuestionCard page correctly', () => {
    const tree = renderer.create(
        <Questions/>).toJSON();
    expect(tree).toMatchSnapshot();
});