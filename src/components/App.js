import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleAdopt = newPet => {
    let adoptedPets = this.state.pets.map(pet => {
      if (pet.id === newPet.id) {
        return { ...newPet, isAdopted: true }
      }
      return pet
    })
    this.setState({
      pets: adoptedPets
    })
  }


  fetchPets = () => {
    let endpoint = '/api/pets';

    if (this.state.filters.type !== 'all') {
      endpoint += `?type=${this.state.filters.type}`;
    }

    fetch(endpoint)
      .then(r => r.json())
      .then(arrOfPets => this.setState({
        pets: arrOfPets
      }));
  };

  onChangeType = ({ target: { value } }) => {
    // console.log(value)
    this.setState({
      filters: {
        ...this.state.filters,
        type: value
      }
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType}
                onFindPetsClick={this.fetchPets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.handleAdopt} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
