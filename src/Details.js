import React from "react";
import pf from "petfinder-client";
import { navigate } from "@reach/router";
import Carousel from "./Carousel";
import Modal from "./Modal"

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Details extends React.Component {
    
    state = {
      loading: true,
      // when we load for the fisrt time, we are loading and return true
      // at the second time, it return false
      showModal: true
    };

    toggleModal = () => this.setState({showModal: !this.state.showModal});

  componentWillMount() {
    petfinder.pet
      .get({
        output: "full",
        id: this.props.id
      })
      .then(data => {
        const pet = data.petfinder.pet;
        let breed;
        if (Array.isArray(pet.breeeds.breed)) {
          breed = pet.breeds.breed.join(", ");
        } else {
          breed = pet.breeds.breed;
        }

        this.this.setState({
          name: pet.name,
          animal: pet.animal,
          location: `${pet.contact.city}, ${pet.contact.state}`,
          description: pet.description,
          media: pet.media,
          breed,
          loading: false
        });
      })
      .catch(err => {
        navigate("/");
        // we put the catch error outside promise. if error, return homepage (this is from @reach/router)
      });
  }

  render() {
    if (this.state.loading) {
      return <hi>loading</hi>;
    }

    const { name, animal, breed, location, description, media, showModal } = this.state;

    return (
      <div className="details">
      <Carousel media={media}/>  
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {location}
          </h2>
          <button onClick={this.toggleModal}>Adopt {name}</button>
          <p>{description}</p>
          {
            showModal ? (
              <Modal>
                <h1>Would you like to adopt {name}</h1>
                <div className= "buttons">
                  <button onClick={this.toggleModal}>Yes</button>
                  <button onClick={this.toggleModal}>Definetely Yes</button>
                </div>
              </Modal>
            ) : null }
        </div>
      </div>
    );
  }
}

export default Details;

/*
the modal is rendering outside of the dom, it's not bubble up to div, because it's in a 
separate domm but because it's in the same React dom, I can catch events coming out of a modal
we can do any any functionality despite the fact that lives in a different part of the dom, i can catch
the events inside details
*/