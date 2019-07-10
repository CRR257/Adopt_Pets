import React from "react";
import SearchBox from "./SearchBox";
import {navigate} from "@reach/router";

class SearchParams extends React.Component {

  handleSerchSubmit() {
    navigate('/')
  }
  render() {
    return (
      <div className="search-route">
        <SearchBox search = {this.handleSerchSubmit}/>
      </div>
    );
  }
}

export default SearchParams;

/* 
SerachParams route that knows nothing about SearchBox
and SearchBOx is able to interact with App.js without passing any data through SearchBox

*/
