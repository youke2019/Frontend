import React from 'react';
import FilterItem from '../src/components/FilterItem';

import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16'
import {shallow, mount, render, configure} from 'enzyme'

configure({adapter: new Adapter()})

const updateFilter = jest.fn((filter) => {

})

const list = {
    credits:[
        {name:'1',value:'1'},
        {name:'2',value:'2'},
        {name:'3',value:'3'},
        {name:'4',value:'4'},
    ]
}

test('renders FilterItem correctly', () => {
    const tree = renderer.create(<FilterItem
        title="学分"
        list={list.credits}
        updateFilter={(filter) => updateFilter(filter)}
    />).toJSON();
    expect(tree).toMatchSnapshot();
});

test('test function changeFoldState()', () => {
    let wrapper = shallow(<FilterItem
    title="学分"
    list={list.credits}
    updateFilter={(filter) => updateFilter(filter)}
    />)

    wrapper.find('TouchableOpacity').prop('onPress')()
    expect(wrapper.state().fold).toBe(false)
});

test('test function changeSelectState()', () => {
    let wrapper = shallow(<FilterItem
        title="学分"
        list={list.credits}
        updateFilter={(filter) => updateFilter(filter)}
    />)

    const button = { name: '1', value: '1', selected: true }
    wrapper.find({title:'1'}).props().onPress()
    expect(wrapper.state().list).toContainEqual(button)
    expect(updateFilter).toHaveBeenCalled()
});