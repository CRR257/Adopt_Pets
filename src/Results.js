import React from "react";
import pf from "petfinder-client";
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
    petfinder.pet
      .find({ output: "full", location: "Seattle, WA" })
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
      <SearchBox/>
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
            />
          );
        })}

        {/* <div>
            {this.state.pets.map(pet => {
              return <li>{pet.name}</li>;
            })}
          </div> */}
      </div>
    );
  }
}

export default Results;
