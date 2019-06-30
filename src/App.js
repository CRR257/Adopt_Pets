import React from "react"

const Pet = props => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("h2", {}, props.animal),
    React.createElement("h2", {}, props.breed)
  ]);
};

class App extends React.Component {
  handleTitleClick() {
    alert("you clicket the title");
  }
  render() {
    return React.createElement(
      "div",
      {},
      React.createElement(
        "h1",
        { onClick: this.handleTitleClick },
        "Adopt Me!"
      ),
      React.createElement(Pet, {
        name: "Jofre",
        animal: "cat",
        breed: "british"
      }),
      React.createElement(Pet, {
        name: "Gal.la",
        animal: "cat",
        breed: "british"
      }),
      React.createElement(Pet, {
        name: "Marilyn",
        animal: "turtle",
        breed: "russian"
      })
    );
  }
}

render(React.createElement(App), document.getElementById("root"));
