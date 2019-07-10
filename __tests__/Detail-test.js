import React from 'react';
import renderer from 'react-test-renderer';
import Detail from '../src/pages/Detail'
import Global from '../src/Global'
test('renders detail page correctly', () => {
    const navigationMock = {
        state: {
            params:{
                course_id: "SE101",
            }
        }
    }
    const tree = renderer.create(<Detail navigation = {navigationMock} />).toJSON();
    expect(tree).toMatchSnapshot();
});