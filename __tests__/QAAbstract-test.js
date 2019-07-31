import React from 'react';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16/build'
import QAAbstract from '../src/components/QAAbstract'

configure({adapter: new Adapter()})

jest.mock("../src/utils/DataRequest.js")

test('renders CommentAbstract component correctly', (done) => {
  const tree = renderer.create(
      <QAAbstract onGotoQuestionPage = {()=>{}}  user_id={"test_id"} course_id={"test_course_id"}  />
  ).toJSON();
  setTimeout(()=>{
    expect(tree).toMatchSnapshot();
    done();
  },1000)
});

describe("<QAAbstract/> component",()=>{
  const wrapper = shallow(
    <QAAbstract onGotoQuestionPage = {()=>{}} user_id={"test_id"} course_id={"test_course_id"} />
  );
  const instance = wrapper.instance();
  console.log(instance)
  it("update when receive props",(done)=>{
    instance.componentDidMount()
    instance.componentWillReceiveProps()
    setTimeout(()=>{done();},1000) /*wait for async to end*/
  })
})