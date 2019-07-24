import Classes from '../src/pages/Classes'
import renderer from 'react-test-renderer'
import React from 'react'
import {shallow, mount, render, configure} from 'enzyme'
import Adapter from "enzyme-adapter-react-16/build"

configure({adapter: new Adapter()})

jest.mock('axios')
jest.mock("../src/utils/LocalStorage.js")
global.baseUrl = 'baseUrl'

test('renders classes page correctly', (done) => {
  const tree = renderer.create(
      <Classes />
  ).toJSON()

    const promise = new Promise(
        function (resolve, reject)
        {resolve('success')})
    promise
        .then(data=>{
            expect(tree).toMatchSnapshot();
            done()
        })
        .catch(err=>{console.log(err)})
});
