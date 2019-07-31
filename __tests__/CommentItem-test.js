import React from 'react';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16/build'
import CommentItem from '../src/components/CommentItem'

configure({adapter: new Adapter()})

jest.mock("../src/utils/DataRequest.js")
const comment_info = JSON.parse("{\"course_comment_id\":14,\"course_id\":\"BM176\",\"course_comment_time\":\"2019-07-18 23:07:37\",\"course_comment_content\":\"我觉得这门课很垃圾\",\"user_id\":\"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A\",\"isbanned\":false,\"course_comment_praise_point\":1,\"current_user_praise\":true,\"courseCommentReportList\":[],\"courseCommentReplyList\":[{\"course_comment_reply_id\":1,\"course_comment_reply_content\":\"服服服\",\"user_id\":\"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A\",\"course_comment_id\":14},{\"course_comment_reply_id\":2,\"course_comment_reply_content\":\"八九十年代不\",\"user_id\":\"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A\",\"course_comment_id\":14},{\"course_comment_reply_id\":3,\"course_comment_reply_content\":\"同意呀\",\"user_id\":\"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A\",\"course_comment_id\":14}]}")
const user_info = {
  id:'test_id'
}
test('renders CommentAbstract component correctly', (done) => {
  const tree = renderer.create(
      <CommentItem
        comment_info={comment_info}
        user_info={user_info}
        refresh={()=>{}}
      />
  ).toJSON();
  setTimeout(()=>{
    expect(tree).toMatchSnapshot();
    done();
  },1000)
});
test('renders CommentAbstract component correctly', (done) => {
  const null_tree = renderer.create(
    <CommentItem
      user_info={user_info}
      refresh={()=>{}}
    />
  ).toJSON();
  setTimeout(()=>{
    expect(null_tree).toMatchSnapshot();
    done();
  },1000)
});
describe("<CommentItem/> component",()=>{
  const wrapper = shallow(
    <CommentItem
  comment_info={comment_info}
  user_info={user_info}
  refresh={()=>{}}
  />
  );
  const instance = wrapper.instance();
  console.log(instance)
  it("react when press like",(done)=>{
    instance.setState({
      liked:true
    })
    instance.onPressLike();
    instance.onPressLike();
    instance.setState({
      liked:false
    })
    instance.onPressLike();
    instance.onPressLike();
    setTimeout(()=>{done();},1000) /*wait for async to end*/
  })
  it("send msg when Reply Done",(done)=>{
    instance.onReplyDone()
    instance.onReplyDone()
    setTimeout(()=>{done();},1000) /*wait for async to end*/
  })
  it("open comment when press Comment",()=>{
    instance.onPressComment()
    setTimeout(()=>{done();},1000) /*wait for async to end*/
  })
  it("refresh when receive props",()=>{
    instance.componentWillReceiveProps({comment_info:{current_user_praise:true}},null)
    instance.componentWillReceiveProps({comment_info:null},null)
    setTimeout(()=>{done();},1000) /*wait for async to end*/
  })
})