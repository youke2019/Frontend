import React from 'react';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16/build'
import { UserIdText } from '../src/components/UserIdText'

configure({adapter: new Adapter()})

jest.mock("../src/utils/DataRequest.js")


describe("<UserIdText/> component",()=>{
  const wrapper = shallow(
    <UserIdText style= {{}} user_id={{id:"test_id"}} />
  );
  const instance = wrapper.instance();
  it("update when receive props",(done)=>{
    instance.componentWillUnmount()
    setTimeout(()=>{done();},1000) /*wait for async to end*/
  })
})