import React from 'react';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16/build'
import StackNavBar from '../src/components/StackNavBar'
import { ShadowedTitle } from '../src/components/ShadowedTitle'

configure({adapter: new Adapter()})
const navigationMock = {
  state: {
    params:{
      course_id: "SE101",
    }
  },
  goBack: ()=>{},
  addListener: jest.fn(()=>{}),
  navigate: jest.fn(()=>{})
}
describe("<StackNavBar/> component",()=>{
  const wrapper_0 = shallow(
    <StackNavBar
      navigation={navigationMock}
      onPress={()=>{}}
    />)
  const wrapper = shallow(
    <StackNavBar
      navigation={navigationMock}
      onPress={()=>{}}
      title={"title"}
      buttonText={"123"}
      backIconUri={"uri"}
    />
  );
  const instance = wrapper.instance();
  it("function well",()=> {
    instance.goBack();
    instance.onPress();
  })
})