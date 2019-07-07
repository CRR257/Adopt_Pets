import React from "react";
import SearchBox from "./SearchBox";

class SearchParams extends React.Component {
  render() {
    return (
      <div className="search-route">
        <SearchBox />
      </div>
    );
  }
}

export default SearchParams;

/* 
SerachParams route that knows nothing about SearchBox
and SearchBOx is able to interact with App.js without passing any data through SearchBox

*/
