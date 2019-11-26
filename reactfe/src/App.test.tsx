import React from 'react'
import ReactDOM from 'react-dom'
import TestRenderer from 'react-test-renderer'
import App from './App'
import AddCar from './components/AddCar'

interface EnvironmentVars {
  SKIP_PREFLIGHT_CHECK: boolean
  REACT_APP_API_URL_CARS: string
}

declare global {
  interface Window {
    _env_: EnvironmentVars
  }
}

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

// it('renders a snapshot', () => {
//   const tree = TestRenderer.create(
//     <AddCar addCar={addCar} fetchCars={fetchCars} />
//   ).toJSON()
//   expect(tree).toMatchSnapshot()
// })
