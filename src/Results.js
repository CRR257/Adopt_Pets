import React from "react";
import pf from "petfinder-client";
import {Consumer} from "./SearchContext";
import Pet from "./Pet";
import SearchBox from "./SearchBox";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Results extends React.Component {
  constructor(props) {
    super(props); //override constructor from React component

    this.state = {
      pets: [],
      somethingElse: true
    };
  }

  componentDidMount() {
    //after render the DOM, we call componentDidMount
    //and it's called once for component
      this.search();
  }
  search() {
    // we write the search method to inicilize anytime we click the submit button
    petfinder.pet
      .find({ output: "full", 
      location: this.props.searchParams.location,
      animal: this.props.searchParams.animal,
      breed: this.props.searchParams.breed
     })
      .then(data => {
        let pets;

        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet];
          }
        } else {
          pets = [];
        }

        this.setState({
          pets
        });
      });
  }


  render() {
    return (
    
      <div className="search">
      <SearchBox search = {this.search}/>
      
        {this.state.pets.map(pet => {
          let breed;

          if (Array.isArray(pet.breeds.breed)) {
            breed = pet.breeds.breed.join(". ");
          } else {
            breed = pet.breeds.breed;
          }

          // const x = `My dog's breed is ${breed}`
          return (
            <Pet
              key={pet.id}
              animal={pet.animal}
              name={pet.name}
              breed={breed}
              media={pet.media}
              location={`${pet.contact.city}, ${pet.contact.state}`}
              id={pet.id}
            />
          );
        })}
      </div>
    );
  }
}

export default function ResultsWithContext(props) {
  return(
    <Consumer>
      {context => <Results {...props} searchParams={context} />}
    </Consumer>
  )
};

/*
{...props} ... is spread operator
this function is to wrap the thing that we export with the consumer
and pass it in as props to results
SearchBox all the props are coming in via context
*/