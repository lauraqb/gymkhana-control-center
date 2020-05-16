import React from 'react'
import { shallow } from 'enzyme'
import GameCard from './GameCard'

let component

beforeEach(() => component = shallow(<GameCard/>))

describe('GameCard component: ', () => {
    it ('Renders correctly', () => {
        expect(component).toMatchSnapshot()
    })
    it ('Does not exist list of teams in div if state.teams has no data', () => {
        expect(component.find('[data-test="teamslist"]')).toHaveLength(0)
    })
    it ('Loads list of teams in div if state.teams has data', () => {
        component.setState({teams: [{name: "test", key:"123"}]})
        expect(component.find('[data-test="teamslist"]')).toHaveLength(1)
    })
    it ('calls function after add new team', () => {
        const button = component.find('[data-test="g-expand-teams-btn"]')
        expect(button).toHaveLength(1)
        button.simulate('click')
        //TODO: testear que funcion es llamada
    })
})