import React from 'react';


const SearchContext = React.createContext( {
    location: "Seattle, WA",
    animal: "",
    breed: "",
    breeds: [],
    handleAnimalChange() {},
    handleBreedChange() {},
    handleLocationChange() {},
    getBreeds() {}
});

export const Provider = SearchContext.Provider; //entrance portal of context
export const Consumer = SearchContext.Consumer; //exit portal of context
