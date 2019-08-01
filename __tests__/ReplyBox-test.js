import React from 'react'
import renderer from 'react-test-renderer'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16/build'
import {TextInput,TouchableOpacity} from 'react-native'
import ReplyBox from '../src/components/ReplyBox'


configure({ adapter: new Adapter() })

jest.mock('../src/utils/DataRequest.js')
jest.mock('../src/utils/LocalStorage.js')

test('renders CommentAbstract component correctly', (done) => {
  const tree = renderer.create(
    <ReplyBox/>
  ).toJSON()
  setTimeout(() => {
    expect(tree).toMatchSnapshot()
    done()
  }, 1000)
})

describe('<ReplyBox /> component', () => {
  const wrapper = shallow(
    <ReplyBox onBackdropPress={() => {}}
              onReplyDone={() => {}}
              visible={false}
    />
  )
  const instance = wrapper.instance()
  it('can update keyword', (done) => {
    instance.updateKeyword("132")
    instance.props.onBackdropPress();
    instance.props.onReplyDone()
    setTimeout(() => {done()}, 100) /*wait for async to end*/
  })
  it('call callback when submit editing',()=>{
    wrapper.find(TextInput).simulate('SubmitEditing')
    setTimeout(() => {done()}, 100) /*wait for async to end*/
  })
  it('call callback when press emit',()=>{
    wrapper.find(TouchableOpacity).simulate('press')
    setTimeout(() => {done()}, 100) /*wait for async to end*/
  })
})

