import React from 'react';
import renderer from 'react-test-renderer';
import { configure, shallow ,mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16/build'
import CourseDetail from '../src/components/CourseDetail'
import { createStore } from 'redux'
import { combinedReducer } from '../src/redux/reducers'


const course_info = JSON.parse('{"course_id":"SE101","course_name":"计算机系统基础（1）","course_hours":80,"course_credits":5.0,"general":false,"general_type":"","course_deptname":"电子信息与电气工程学院","classes":[{"classname":"2018-2019-1-SE101-392689","course_id":"SE101","teacher_id":"11145","teacher_name":"臧斌宇","teachers":"11145/臧斌宇/教授[电子信息与电气工程学院];10886/陈榕/副教授[电子信息与电气工程学院]","course_participants":48,"class_note":"","year":2018,"semester":1,"classSegments":[{"class_sec_id":9868,"classname":"2018-2019-1-SE101-392689","classroom":"东上院102","begin_week":null,"end_week":null,"begin_sec":null,"end_sec":null,"week":null,"odd_or_even":"b"},{"class_sec_id":9869,"classname":"2018-2019-1-SE101-392689","classroom":"东上院102","begin_week":null,"end_week":null,"begin_sec":null,"end_sec":null,"week":null,"odd_or_even":"b"},{"class_sec_id":9870,"classname":"2018-2019-1-SE101-392689","classroom":"东上院102","begin_week":null,"end_week":null,"begin_sec":null,"end_sec":null,"week":null,"odd_or_even":"b"},{"class_sec_id":9871,"classname":"2018-2019-1-SE101-392689","classroom":"东上院102","begin_week":null,"end_week":null,"begin_sec":null,"end_sec":null,"week":null,"odd_or_even":"b"},{"class_sec_id":20170,"classname":"2018-2019-1-SE101-392689","classroom":"东上院102","begin_week":1,"end_week":16,"begin_sec":7,"end_sec":8,"week":2,"odd_or_even":"b"},{"class_sec_id":20171,"classname":"2018-2019-1-SE101-392689","classroom":"东上院102","begin_week":1,"end_week":16,"begin_sec":7,"end_sec":8,"week":2,"odd_or_even":"b"},{"class_sec_id":20172,"classname":"2018-2019-1-SE101-392689","classroom":"东上院102","begin_week":1,"end_week":16,"begin_sec":3,"end_sec":4,"week":5,"odd_or_even":"b"},{"class_sec_id":20173,"classname":"2018-2019-1-SE101-392689","classroom":"东上院102","begin_week":1,"end_week":16,"begin_sec":3,"end_sec":4,"week":5,"odd_or_even":"b"}]}]}')
const course_info1 = JSON.parse('{"course_id":"SE102","course_name":"计算机系统基础（1）","course_hours":80,"course_credits":5.0,"general":false,"general_type":"","course_deptname":"电子信息与电气工程学院","classes":[{"classname":"2018-2019-1-SE101-392689","course_id":"SE101","teacher_id":"11145","teacher_name":"臧斌宇","teachers":"11145/臧斌宇/教授[电子信息与电气工程学院];10886/陈榕/副教授[电子信息与电气工程学院]","course_participants":48,"class_note":"","year":2018,"semester":1,"classSegments":[{"class_sec_id":9868,"classname":"2018-2019-1-SE101-392689","classroom":"东上院102","begin_week":null,"end_week":null,"begin_sec":null,"end_sec":null,"week":null,"odd_or_even":"b"},{"class_sec_id":9869,"classname":"2018-2019-1-SE101-392689","classroom":"东上院102","begin_week":null,"end_week":null,"begin_sec":null,"end_sec":null,"week":null,"odd_or_even":"b"},{"class_sec_id":9870,"classname":"2018-2019-1-SE101-392689","classroom":"东上院102","begin_week":null,"end_week":null,"begin_sec":null,"end_sec":null,"week":null,"odd_or_even":"b"},{"class_sec_id":9871,"classname":"2018-2019-1-SE101-392689","classroom":"东上院102","begin_week":null,"end_week":null,"begin_sec":null,"end_sec":null,"week":null,"odd_or_even":"b"},{"class_sec_id":20170,"classname":"2018-2019-1-SE101-392689","classroom":"东上院102","begin_week":1,"end_week":16,"begin_sec":7,"end_sec":8,"week":2,"odd_or_even":"b"},{"class_sec_id":20171,"classname":"2018-2019-1-SE101-392689","classroom":"东上院102","begin_week":1,"end_week":16,"begin_sec":7,"end_sec":8,"week":2,"odd_or_even":"b"},{"class_sec_id":20172,"classname":"2018-2019-1-SE101-392689","classroom":"东上院102","begin_week":1,"end_week":16,"begin_sec":3,"end_sec":4,"week":5,"odd_or_even":"b"},{"class_sec_id":20173,"classname":"2018-2019-1-SE101-392689","classroom":"东上院102","begin_week":1,"end_week":16,"begin_sec":3,"end_sec":4,"week":5,"odd_or_even":"b"}]}]}')

const initialState = {
  user_info: {
    id: "30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A",
  },
  sortlist:[
    course_info
  ],
  course_list: null,
  login_ready:false,
}
const store = createStore(combinedReducer,initialState)

configure({adapter: new Adapter()})

jest.mock("../src/utils/DataRequest.js")
jest.mock("../src/utils/LocalStorage.js")

test('renders CommentAbstract component correctly', (done) => {
  const tree = renderer.create(
      <CourseDetail store = {store} course = {course_info}  />
  ).toJSON();
  setTimeout(()=>{
    expect(tree).toMatchSnapshot();
    done();
  },1000)
});

describe("<CourseDetail /> component",()=>{
  const wrapper = shallow(
    <CourseDetail store = {store}  course = {course_info}  />
  );
  const instance = wrapper.dive().dive().instance();
  it("can switch detail state",(done)=>{
    instance.switchClassesDetailState();
    setTimeout(()=>{done();},100) /*wait for async to end*/
  })
  it("collect course into sortlist",(done)=>{
    instance.onCollect()
    setTimeout(()=>{done();},100) /*wait for async to end*/
  })
  it("render correctly when detail visible",(done)=>{/* not working*/
    setTimeout(()=>{done();},100) /*wait for async to end*/
  })
})

describe("<CourseDetail /> component not collected",()=>{
  const wrapper = shallow(
    <CourseDetail store = {store}  course = {course_info1}  />
  );
  const instance = wrapper.dive().dive().instance();
  it("collect course out of sortlist",(done)=>{
    instance.onCollect()
    setTimeout(()=>{done();},100) /*wait for async to end*/
  })
})
describe("<CourseDetail /> mount",()=>{/*not working*/
  const wrapper = shallow(<CourseDetail store = {store}  course = {course_info1}/>).dive().dive()
  const instance = wrapper.instance()
  console.log(instance)
  it("render details when set state",()=> {
    expect(instance.state.classesDetailVisible).toBe(false)
    wrapper.setState({ classesDetailVisible: true })
    expect(instance.state.classesDetailVisible).toBe(true)
    setTimeout(()=>{done();},100) /*wait for async to end*/
  })
})
