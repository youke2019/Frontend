import React from 'react';
import About from '../src/pages/About';
import renderer from 'react-test-renderer';


test('renders course page correctly', () => {
    const tree = renderer.create(
            <About />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});