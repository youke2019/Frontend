import React from 'react';
import renderer from 'react-test-renderer';
import Courses from '../src/pages/Courses'
import { createStore } from 'redux'
import { combinedReducer } from '../src/redux/reducers'
import { Provider } from 'react-redux'
import Adapter from 'enzyme-adapter-react-16'
import {shallow,mount,configure} from 'enzyme'
import axios from 'axios'

configure({adapter: new Adapter()})

const testInitialState = {
    user_info: null,
    course_list: JSON.parse("[{\"course_id\":\"CV440\",\"course_name\":\"土木工程应用软件\",\"course_hours\":32,\"course_credits\":2,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"船舶海洋与建筑工程学院\"},{\"course_id\":\"EE312\",\"course_name\":\"软件工程（C类）\",\"course_hours\":34,\"course_credits\":2,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"电子信息与电气工程学院\"},{\"course_id\":\"EM403\",\"course_name\":\"大型工程软件应用\",\"course_hours\":48,\"course_credits\":3,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"船舶海洋与建筑工程学院\"},{\"course_id\":\"IM414\",\"course_name\":\"计算机硬件与软件原理\",\"course_hours\":48,\"course_credits\":3,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"安泰经济与管理学院\"},{\"course_id\":\"IS415\",\"course_name\":\"系统软件课程设计\",\"course_hours\":34,\"course_credits\":2,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"电子信息与电气工程学院\"},{\"course_id\":\"SE100\",\"course_name\":\"软件工程创新实践基础\",\"course_hours\":32,\"course_credits\":2,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"电子信息与电气工程学院\"},{\"course_id\":\"SE300\",\"course_name\":\"软件工程\",\"course_hours\":56,\"course_credits\":4,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"电子信息与电气工程学院\"},{\"course_id\":\"SE407\",\"course_name\":\"软件工程\",\"course_hours\":16,\"course_credits\":1,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"电子信息与电气工程学院\"},{\"course_id\":\"SE419\",\"course_name\":\"企业软件质量保证\",\"course_hours\":16,\"course_credits\":1,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"电子信息与电气工程学院\"},{\"course_id\":\"SE422\",\"course_name\":\"企业软件过程与管理\",\"course_hours\":16,\"course_credits\":1,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"电子信息与电气工程学院\"},{\"course_id\":\"XP401\",\"course_name\":\"生产实习（软件工程）\",\"course_hours\":256,\"course_credits\":16,\"general\":false,\"general_type\":\"\",\"course_deptname\":\"电子信息与电气工程学院\"}]"),
}


const store = createStore(combinedReducer,testInitialState)

test('renders course page correctly', () => {
    const tree = renderer.create(
        <Provider store={store}>
            <Courses navigation = { null} />
        </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

describe('functionality', () => {
    let wrapper = shallow(<Courses store={store}/>).dive().dive()

    it('filterVisible functions', () => {

        console.log(wrapper.instance())
        wrapper.instance().showFilter()
        expect(wrapper.state('filterVisible')).toBe(true)
        wrapper.instance().onBackdropPress()
        expect(wrapper.state('filterVisible')).toBe(false)
    })

    it('filterList functions', () => {
        expect(wrapper.instance().filterNotEmpty()).toBe(false)
        wrapper.instance().updateFilter({
            学分:['1','2']
        })
        console.log(wrapper.state('filterList')['学分'])
        expect(wrapper.state('filterList')['学分']).toStrictEqual(['1','2'])
        expect(wrapper.instance().filterNotEmpty()).toBe(true)
    })

    it('search function', (done) => {
        jest.mock('axios')
        global.baseUrl = 'baseUrl'
        wrapper.instance().search('花')
        const promise = new Promise(
            function (resolve, reject)
            {resolve('success')})
        axios.post()
            .then(data=>{
                console.log(wrapper.props())
                done()
            })
            .catch(data=>{done()})

    })
})
