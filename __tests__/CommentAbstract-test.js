import React from 'react';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16/build'
import CommentAbstract from '../src/components/CommentAbstract'

configure({adapter: new Adapter()})

jest.mock("../src/utils/DataRequest.js")

test('renders CommentAbstract component correctly', (done) => {
  const tree = renderer.create(
      <CommentAbstract onGotoCommentPage = {()=>{}}  />
  ).toJSON();
  setTimeout(()=>{
    expect(tree).toMatchSnapshot();
    done();
  },1000)
});

describe("<CommentAbstract/> component",()=>{
  const wrapper = shallow(
    <CommentAbstract onGotoCommentPage = {()=>{}} user_info={{id:"test_id"}} course_id={"test_course_id"} />
  );
  const instance = wrapper.instance();
  console.log(instance)
  it("update when receive props",(done)=>{
    instance.componentWillReceiveProps({
      course_id :"test_course_id"
    },null)
    instance.componentWillReceiveProps({
      course_id :"test_course_id"
    },null)
    instance.getCommentData(null)
    setTimeout(()=>{done();},1000) /*wait for async to end*/
  })
})