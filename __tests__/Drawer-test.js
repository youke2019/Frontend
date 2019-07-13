import React from 'react';
import Drawer from '../src/components/Drawer';

import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16'
import {shallow, mount, render, configure} from 'enzyme'

configure({adapter: new Adapter()})

const updateFilter = jest.fn((filter) => {

})

test('renders Drawer correctly', () => {
    const tree = renderer.create(<Drawer/>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('test function updateFilter()', () => {
    let wrapper = shallow(<Drawer updateFilter={updateFilter}/>)

    wrapper.find({title:'学分'}).props().updateFilter()
    wrapper.find({title:'通识类型'}).props().updateFilter()
    wrapper.find({title:'上课时间'}).props().updateFilter()
    expect(updateFilter).toHaveBeenCalledTimes(3)
});

