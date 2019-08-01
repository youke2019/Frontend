import React from 'react';
import Home from '../src/pages/Home';
import renderer from 'react-test-renderer';
import { createStore } from 'redux'
import { combinedReducer } from '../src/redux/reducers'

const initialState = {
    user_info: {
        id: "30673CFC-4D4C-4FC1-9FE4-000B3D9DAA9A",
    },
    course_list: null,
    login_ready:false,
}
const store = createStore(combinedReducer,initialState)

jest.mock("../src/utils/LocalStorage.js")

test('renders home page correctly', (done) => {
    const tree = renderer.create(<Home store={store}/>).toJSON();

    setTimeout(()=>{
        expect(tree).toMatchSnapshot();
        done();
    },1000)
});