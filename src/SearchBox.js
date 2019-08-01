import React from "react";
import { ANIMALS } from "petfinder-client";
import { Consumer } from "./SearchContext";

class SearchBox extends React.Component {

  handleFormSubmit = event => {
    event.preventDefault();
    this.props.search()
  };

  render() {
    return (
      <Consumer>
        {context => (
          <div className="search-params">
          <form onSubmit={this.handleFormSubmit}>
            <label htmlFor="location">
              Location:
              <input
                onChange={context.handleLocationChange}
                id="location"
                value={context.location}
                placeholder="Location"
              />
            </label>
            <label htmlFor="animal">
              Animal:
              <select
                id="animal"
                value={context.animal}
                onChange={context.handleAnimalChange}
                onBlur={context.handleAnimalChange}
              >
                <option />
                {ANIMALS.map(animal => (
                  <option key={animal} value={animal}>
                    {animal}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="breed">
              Breed:
              <select
                id="breed"
                value={context.breed}
                onChange={context.handleBreedChange}
                onBlur={context.handleBreedChange}
                disabled={!context.breeds.length} //if length === 0, is disabled
                //disabled={context.breeds.length === 0} is the same
              >
                <option />
                {context.breeds.map(breed => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              </select>
            </label>
            <button>Submit</button>
            <p>Select an adorable pet to adopt it!</p>
           </form>
          </div>
        )}
      </Consumer>
    );
  }
}

export default SearchBox;

/*
Consumer is for to make available all of the data from app inside our consumer there

Now, context is on the scope, I can reference the things that are on context. 
this  {context => ( is the state from app, so we can reference
context.animal or context.breed and it will reflective of the state of app.js
context is the state of app (what breeds are searching for, or animals are searching for?)
What thumbnail are we showing is more a view state, 

We put the form because if we hit enter on, it will do the search, as we submit button

*/