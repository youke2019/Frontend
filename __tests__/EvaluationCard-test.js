import React from 'react'
import renderer from 'react-test-renderer'
import {shallow, mount, render, configure} from 'enzyme'
import EvaluationCard from '../src/components/EvaluationCard'
import Adapter from "enzyme-adapter-react-16/build"

configure({adapter: new Adapter()})

const evaluation = {
    "evaluate_id": 5,
    "evaluate_time": "2019-07-22 14:21:34",
    "user_id": "1A7A1F80-59D0-4E8C-B4C6-AAAFFC606120",
    "course_id": "LI901",
    "evaluate_content": {
        "course_id": "LI901",
        "课程简述": "又水分又高",
        "credit_point": 10,
        "上课自由程度": "基本不管 坐后排随便你干嘛",
        "课程个人体验": "课是挺水的 但是没什么好玩的地方",
        "evaluate_id": 5,
        "user_id": "1A7A1F80-59D0-4E8C-B4C6-AAAFFC606120",
        "考核形式": "5分钟个人pre+1000字论文"
    },
    "evaluate_praise_point": 0,
    "current_user_praise": false,
    "courseEvaluationPraiseList": []
}

const onDetail = jest.fn(() => {})
jest.mock('axios')
global.baseUrl = 'baseUrl'

describe('functions', () => {
    let wrapper = shallow(
        <EvaluationCard
            evaluation={evaluation}
            onDetail={onDetail}
        />)

    it('switchDetailState()', () => {
        wrapper.setState({
            showDetail: false
        })
        expect(wrapper.instance().state.showDetail).toBe(false)
        wrapper.instance().switchDetailState()
        expect(wrapper.instance().state.showDetail).toBe(true)
        expect(onDetail).toHaveBeenCalled()
    })
})

test('renders QuestionCard page correctly', () => {
    const tree = renderer.create(
        <EvaluationCard
            evaluation={evaluation}
            onDetail={onDetail}
        />).toJSON()
    expect(tree).toMatchSnapshot();
})
