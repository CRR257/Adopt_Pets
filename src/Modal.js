import React from "React";
import { CreatePortal } from "react-dom";

const modalRoot = document.getElementById("modal");

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.el = document.createElement("div");
  }
  componentDidMount() {
    modalRoot.appendChild(this.el);
  }
  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return CreatePortal(this.props.children, this.el);
  }
}

/*when this unmounts, remove it
it's for clean momory to avoid crashes in the browser:
remove event listeners, extraneous documents stuff,
anything that's gonna leak memory
*/
