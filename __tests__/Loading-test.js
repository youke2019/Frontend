import React from 'react';
import Loading from '../src/components/Loading';

import renderer from 'react-test-renderer';

test('renders home page correctly', () => {
    const tree = renderer.create(<Loading />).toJSON();
    expect(tree).toMatchSnapshot();
});