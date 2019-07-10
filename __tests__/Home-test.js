import React from 'react';
import Home from '../src/pages/Home';

import renderer from 'react-test-renderer';

test('renders home page correctly', () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
});