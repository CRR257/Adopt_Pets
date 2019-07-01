import React from "react";
import {render} from "react-dom";
import Pet from "./Pet";

class App extends React.Component {
  handleTitleClick() {
    alert("you clicket the title");
  }
  render() {

  return (
    <div>
    <h1 onClick={this.handleTitleClick()}>Adopt me!</h1>
    <Pet name="Jofre" animal="cat" breed="british" />
    <Pet name="Jofre" animal="cat" breed="british" />
    <Pet name="Jofre" animal="cat" breed="british" />
    </div>
  )
  }

}

render(<App/>, document.getElementById("root"));
