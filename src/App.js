import React from "react";
import ReactDOM from "react-dom";
import pf from "petfinder-client";
import { Provider } from "./SearchContext";
import { Router, Link } from "@reach/router";
import Results from "./Results";
import Details from "./Details";
import SearchParams from "./SearchParams";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: "Seattle, WA",
      animal: "",
      breed: "",
      breeds: [],
      handleAnimalChange: this.handleAnimalChange,
      handleBreedChange: this.handleBreedChange,
      handleLocationChange: this.handleLocationChange,
      getBreeds: this.getBreeds
    };
  }

  handleLocationChange = event => {
    this.setState({
      location: event.target.value
    });
  };

  handleAnimalChange = event => {
    this.setState(
      {
        animal: event.target.value,
        // breed: ""
      },
      this.getBreeds
    );
  };

  handleBreedChange = event => {
    this.setState({
      breed: event.target.value
    });
  };
  getBreeds() {
    if (this.state.animal) {
      petfinder.breed
      .list({ animal: this.state.animal })
      .then(data => {
        if (
          data.petfinder &&
          data.petfinder.breeds &&
          Array.isArray(data.petfinder.breeds.breed)
        ) {
          this.setState({
            breeds: data.petfinder.breeds.breed
          });
        } else {
          this.setState({ breeds: [] });
        }
      })
      .catch(console.error);
  } else {
    this.setState({
      breeds: []
    });
  }
}

  render() {
    return (
      <div>
        <header>
          <Link to="/">Adopt Pets 🐱__🐢</Link>
          <Link to="/search-params" />
        </header>
        <h2>The best search engine to find your best friend!</h2>
        <Provider value={this.state}>
          <Router>
            <Results path="/" />
            <Details path="/details/:id" />
            <SearchParams path="/search-params" />
          </Router>
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

/*
  We use context if we need to pass from the root parent to every route
  (if something has to live in the parent component and is used in more
  than > 4places).
  
  <Provider value={this.state}> we pass this.state from app.js
  we're thowing into the entrance portal tihs.state: location, animals,
  breeds, breed, handlers and getBreeds.

  Anything that goes inside router, router can refer t as this.props.children, it's whatever
  children components are being passed to it. we are passing inside router:
  results, details and search-params, they don't have any children,
  they are self closing tags (children is whatever things we are passed to)
*/
