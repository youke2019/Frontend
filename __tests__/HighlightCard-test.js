import renderer from 'react-test-renderer';
import Global from '../src/Global'
import { createStore } from 'redux'
import { combinedReducer } from '../src/redux/reducers'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16/build'
import Highlight from '../src/pages/Highlight'
import React from 'react'
import HighlightCard from '../src/components/HighlightCard'

const initialState = {
  user_info: {
    id: "30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A",
  },
  course_list: null,
  login_ready:false,
}
const store = createStore(combinedReducer,initialState)
configure({adapter: new Adapter()})



jest.mock("../src/utils/DataRequest.js")

const refresh = jest.fn(()=>{})
const data = JSON.parse("{\"video_id\":1,\"user_id\":\"46420\",\"post_time\":\"177IG770\",\"post_text\":\"UC4GR662312XE4H5MBDU923644WLL3QE563EEQ7QBBT7\",\"video_url\":\"58850\",\"video_type\":\"W\",\"image_url\":\"3\",\"isbanned\":false,\"video_praise_point\":1,\"current_user_praise\":true,\"courseMomentCommentList\":[{\"video_comment_id\":2,\"video_id\":1,\"user_id\":\"14963\",\"video_comment_content\":\"07335\",\"video_comment_time\":\"69660\",\"isbanned\":true},{\"video_comment_id\":3,\"video_id\":1,\"user_id\":\"14963\",\"video_comment_content\":\"16292\",\"video_comment_time\":\"71693\",\"isbanned\":true},{\"video_comment_id\":6,\"video_id\":1,\"user_id\":\"34992\",\"video_comment_content\":\"74875\",\"video_comment_time\":\"95459\",\"isbanned\":true},{\"video_comment_id\":13,\"video_id\":1,\"user_id\":\"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A\",\"video_comment_content\":\"还是是你的\",\"video_comment_time\":\"2019-07-20 23:22:26\",\"isbanned\":false},{\"video_comment_id\":14,\"video_id\":1,\"user_id\":\"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A\",\"video_comment_content\":\"好的好的姐姐的\",\"video_comment_time\":\"2019-07-20 23:38:58\",\"isbanned\":false},{\"video_comment_id\":15,\"video_id\":1,\"user_id\":\"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A\",\"video_comment_content\":\"防脱发头发\",\"video_comment_time\":\"2019-07-20 23:40:46\",\"isbanned\":false},{\"video_comment_id\":16,\"video_id\":1,\"user_id\":\"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A\",\"video_comment_content\":\"刚才填充图册填充图册太吓人饭堂吃同学人吃肉馅肉馅长途车如此\",\"video_comment_time\":\"2019-07-20 23:42:05\",\"isbanned\":false},{\"video_comment_id\":18,\"video_id\":1,\"user_id\":\"1A7A1F80-59D0-4E8C-B4C6-AAAFFC606120\",\"video_comment_content\":\"你是真的牛逼\",\"video_comment_time\":\"2019-07-22 11:32:41\",\"isbanned\":false},{\"video_comment_id\":20,\"video_id\":1,\"user_id\":\"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A\",\"video_comment_content\":\"？\",\"video_comment_time\":\"2019-07-22 16:54:50\",\"isbanned\":false}],\"courseMomentPraiseList\":[{\"video_praise_id\":11,\"user_id\":\"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A\",\"video_id\":1},{\"video_praise_id\":12,\"user_id\":\"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A\",\"video_id\":1},{\"video_praise_id\":13,\"user_id\":\"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A\",\"video_id\":1},{\"video_praise_id\":14,\"user_id\":\"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A\",\"video_id\":1},{\"video_praise_id\":15,\"user_id\":\"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A\",\"video_id\":1},{\"video_praise_id\":16,\"user_id\":\"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A\",\"video_id\":1},{\"video_praise_id\":17,\"user_id\":\"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A\",\"video_id\":1},{\"video_praise_id\":18,\"user_id\":\"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A\",\"video_id\":1},{\"video_praise_id\":19,\"user_id\":\"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A\",\"video_id\":1},{\"video_praise_id\":20,\"user_id\":\"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A\",\"video_id\":1},{\"video_praise_id\":21,\"user_id\":\"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A\",\"video_id\":1},{\"video_praise_id\":22,\"user_id\":\"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A\",\"video_id\":1},{\"video_praise_id\":23,\"user_id\":\"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A\",\"video_id\":1},{\"video_praise_id\":24,\"user_id\":\"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A\",\"video_id\":1},{\"video_praise_id\":25,\"user_id\":\"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A\",\"video_id\":1},{\"video_praise_id\":26,\"user_id\":\"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A\",\"video_id\":1}]}")
const user_id = "30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A";

test('renders highlightCard  correctly', (done) => {
  const tree = renderer.create(
    <HighlightCard store = {store} refresh={refresh} data = {data} user_id = {user_id}/>
  ).toJSON();
  setTimeout(()=>{
    expect(tree).toMatchSnapshot();
    done();
  },1000)
});

describe("<HighlightCard /> component",()=>{
  const wrapper = shallow(
    <HighlightCard store = {store} refresh={refresh} data = {data} user_id = {user_id}/>
  );
  const instance = wrapper.dive().dive().instance();
  console.log(instance)
  it("click praise 4 times",(done)=>{
    instance.onPressLike();
    instance.onPressLike();
    instance.onPressLike();
    instance.onPressLike();
    setTimeout(()=>{done()},1000)
  })
  it("send comment request 2 times ",(done)=>{
    instance.sendComment("123123123");
    instance.sendComment("123123123");
    setTimeout(()=>{done()},1000)
  })
  it("send comment when reply done", (done)=>{
    instance.onReplyDone("123123123");
    setTimeout(()=>{done()},1000)
  })
  it("set state when press comment", (done)=>{
    instance.onPressComment();
    setTimeout(()=>{done()},1000)
  })
  it("set state when close comment",(done)=>{
    instance.closeComment()
    setTimeout(()=>{done()},1000)
  })
  it("react when receive props",(done)=>{
    instance.componentWillReceiveProps({
      data:{
        current_user_praise:true,
      }
    },{})
    setTimeout(()=>{done()},1000)
  })
  it("can fold and unfold",(done)=>{
    instance._renderRevealedFooter();
    instance._renderTruncatedFooter();
    instance._handleTextReady();
    setTimeout(()=>{done()},1000)
  })
})