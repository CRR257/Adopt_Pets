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
    
  state = { loading: true, showModal: false };
      // when we load for the fisrt time, we are loading and return true
      // at the second time, it return false

  componentDidMount() {
    petfinder.pet
      .get({
        output: "full",
        id: this.props.id
      })
      .then(data => {
        let breed;
        if (Array.isArray(data.petfinder.pet.breeds.breed)) {
          breed = data.petfinder.pet.breeds.breed.join(", ");
        } else {
          breed = data.petfinder.pet.breeds.breed;
        }
        this.setState({
          name: data.petfinder.pet.name,
          animal: data.petfinder.pet.animal,
          location: `${data.petfinder.pet.contact.city}, ${
            data.petfinder.pet.contact.state
          }`,
          description: data.petfinder.pet.description,
          media: data.petfinder.pet.media,
          breed,
          loading: false
        });
      })
      .catch(err => {
        navigate("/");
        // we put the catch error outside promise. if error, return homepage (this is from @reach/router)
      });
    }

  toggleModal = () => this.setState({showModal: !this.state.showModal});

  render() {
    if (this.state.loading) {
      return <h1>loading...</h1>;
    }

    const { name, animal, breed, location, description, media, showModal } = this.state;

    console.log(this.myH1);

    return (
      <div className="details">
      <Carousel media={media}/>
      <div>
        <h1 ref={(el) => this.myH1 = el}>{name}</h1>
      </div>
      <div>
        {/* <h3>{name}</h3> */}
        <h2>{` ${animal} — ${breed} — ${location}`}</h2>
        <button onClick={this.toggleModal}>Adopt {name}</button>
        <p>{description}</p>
        {showModal ? (
            <Modal>
              <h1>Would you like to adopt {name}?</h1>
              <div className="buttons">
                <button onClick={this.toggleModal}>Yes</button>
                <button onClick={this.toggleModal}>No</button>
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

/*
ref is for when you need to reference DOM inside React (if you use libraries)
when it renders for the 1rst time, it's undefined, it hasn't renderet out yet, but
at the 2nd time exist because it's rendered.
*/
