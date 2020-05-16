import React from 'react'
import Home from './Home'
import { shallow } from 'enzyme'

describe('Home Page', () => {
    it ('Renders correctly', () => {
        const component = shallow(<Home/>)
        expect(component).toMatchSnapshot()
    })
})