import React from 'react'
import ListItem from '../src/components/ListItem'
import Adapter from 'enzyme-adapter-react-16'
import {shallow,configure} from 'enzyme'
import renderer from 'react-test-renderer';

configure({adapter: new Adapter()})

test('render an empty ListItem', () => {
    const tree = renderer.create(<ListItem />).toJSON();
    expect(tree).toMatchSnapshot();
});

const text = '课程'
const image = 'nop'
const onPress = jest.fn(() => {

})

test('render ListItem with data', () => {
    let tree = renderer.create(
        <ListItem
            text={text}
            image={image}
            onPress={onPress}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

test('test onPress', () => {
    let wrapper = shallow(
        <ListItem
            text={text}
            image={image}
            onPress={onPress}
        />
    )

    wrapper.find('TouchableOpacity').props().onPress()
    expect(onPress).toHaveBeenCalled();
});


