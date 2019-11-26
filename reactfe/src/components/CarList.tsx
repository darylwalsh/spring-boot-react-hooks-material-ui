import React, { Component } from 'react'
import AddCar from './AddCar'
import EditCar from './EditCar'
import ReactTable from 'react-table'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-table/react-table.css'

interface CarListProps {}

interface CarInterface {
  brand: string
  model: string
  color: string
  year: string
  price: string
}
interface CarsState {
  cars: CarInterface[]
}

interface EnvironmentVars {
  SKIP_PREFLIGHT_CHECK: boolean
  REACT_APP_API_URL_CARS: string
}

declare global {
  interface Window {
    _env_: EnvironmentVars
  }
}

class CarList extends Component<CarListProps, CarsState> {
  constructor(props: CarListProps) {
    super(props)
    this.state = { cars: [] }
  }
  componentDidMount() {
    this.fetchCars()
  }

  fetchCars = () => {
    fetch(window._env_.REACT_APP_API_URL_CARS)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          cars: responseData._embedded.cars,
        })
      })

      .catch(err => console.error(err))
  }

  onDelClick = (link: string) => {
    if (window.confirm('Are you sure to delete?')) {
      fetch(link, { method: 'DELETE' })
        .then(res => {
          toast.success('Car deleted', {
            position: toast.POSITION.BOTTOM_LEFT,
          })
          this.fetchCars()
        })
        .catch(err => {
          toast.error('Error when deleting', {
            position: toast.POSITION.BOTTOM_LEFT,
          })
          console.error(err)
        })
    }
  }

  // Add new car
  addCar(car: CarInterface) {
    fetch(window._env_.REACT_APP_API_URL_CARS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    })
      .then(res => this.fetchCars())
      .catch(err => console.error(err))
  }

  // Update car
  updateCar(car: CarInterface, link: string) {
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    })
      .then(res => {
        toast.success('Changes saved', {
          position: toast.POSITION.BOTTOM_LEFT,
        })
        this.fetchCars()
      })
      .catch(err =>
        toast.error('Error when saving', {
          position: toast.POSITION.BOTTOM_LEFT,
        })
      )
  }

  render() {
    const columns = [
      {
        Header: 'Brand',
        accessor: 'brand',
      },
      {
        Header: 'Model',
        accessor: 'model',
      },
      {
        Header: 'Color',
        accessor: 'color',
      },
      {
        Header: 'Year',
        accessor: 'year',
      },
      {
        Header: 'Price $',
        accessor: 'price',
      },
      {
        id: 'updatebutton',
        sortable: false,
        filterable: false,
        width: 100,
        accessor: '_links.self.href',
        Cell: ({ value, row }: { value: string; row: CarInterface }) => (
          <EditCar
            car={row}
            link={value}
            updateCar={this.updateCar}
            fetchCars={this.fetchCars}
          />
        ),
      },
      {
        id: 'delbutton',
        sortable: false,
        filterable: false,
        width: 100,
        accessor: '_links.self.href',
        Cell: ({ value }: { value: string }) => (
          <button
            onClick={() => {
              this.onDelClick(value)
            }}>
            Delete
          </button>
        ),
      },
    ]

    return (
      <div className="App">
        <AddCar addCar={this.addCar} fetchCars={this.fetchCars} />
        <ReactTable
          data={this.state.cars}
          columns={columns}
          filterable={true}
          pageSize={10}
        />
        <ToastContainer autoClose={1500} />
      </div>
    )
  }
}

export default CarList
