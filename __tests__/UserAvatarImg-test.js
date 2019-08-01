import React from 'react';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16/build'
import { UserIdText } from '../src/components/UserIdText'
import { UserAvatarImg } from '../src/components/UserAvatarImg'

configure({adapter: new Adapter()})


jest.mock("../src/utils/DataRequest.js")
describe("<UserAvatarImg/> component",()=>{
  const wrapper = shallow(
    <UserAvatarImg style= {{}} img_style= {{}} user_id={{id:"test_id"}} />
  );
  const instance = wrapper.instance();
  it("getUserByID correctly",(done)=>{
    instance.componentDidMount()
    instance.componentDidMount()
    setTimeout(()=>{
      expect(instance.state.url).toEqual("test_url")
      done()
    },2000) /*wait for async to end*/
  })
})
