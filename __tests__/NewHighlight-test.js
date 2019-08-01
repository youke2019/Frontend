
import renderer from 'react-test-renderer';
import { createStore } from 'redux'
import { combinedReducer } from '../src/redux/reducers'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16/build'
import React from 'react'
import NewHighlight from '../src/pages/NewHighlight'
import ImagePicker from 'react-native-image-crop-picker'
import { sendNewHighlight } from '../src/utils/DataRequest'

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
const navigationMock = {
  navigate:()=>{},
  goBack:()=>{},
  user_id:"30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A",
  state:{
    params:{
      user_id:user_id,
      callBack:()=>{}
    }
  }
}
jest.mock("react-native-image-crop-picker",()=>{
  return {
    openPicker : jest
      .fn(()=> Promise.resolve({
        path:"path://test_path"
      }))
      .mockRejectedValueOnce("error")
  }
})

test('renders newHighlight Page correctly', (done) => {
  const tree = renderer.create(
    <NewHighlight store = {store} navigation={navigationMock}/>
  ).toJSON();
  setTimeout(()=>{
    expect(tree).toMatchSnapshot();
    done();
  },1000)
});
describe("<NewHighlight /> component",()=>{
  const wrapper = shallow(
    <NewHighlight store = {store} navigation={navigationMock}/>
  );
  const instance = wrapper.instance();
  it("will send request when click send icon",(done)=>{
    wrapper.setState({
    content:"123",
    avatarSources: [
      { source:2 },
    ] })
    /* fail first time*/
    instance.send()
    setTimeout(()=>{
      instance.send();
      instance.send();
      setTimeout(()=>{
        wrapper.setState({
          content:"123",
          avatarSources: []
        })
        instance.send();
        instance.send();
        setTimeout(()=>{done()},1000)
        },1000)
    },1000)


  })
  it("will update content when input text",()=>{
    instance.updateContent("1241234123");
  })
  it("will delete imgae when long press",()=>{
    instance.setState({
      avatarSources:[{no:1},{no:2}],
    })
    instance.delete(0);
  })
  it("can upload pic",()=>{
    instance.uploadPic()
    instance.uploadPic()
  })
  it("call delete when press button",(done)=>{
    wrapper.setState({
      avatarSources:[{
        uri:'test_uri'
      }]
    })
    wrapper.find(".delete_0").simulate('LongPress')
    setTimeout(()=>{done()},1000)
  })
})