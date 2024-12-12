import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const App = () => {
  const [heading, setHeading] = useState("Magnificent Monkeys");

  const clickHandler = () => {
    setHeading("Radical Rhinos");
  };

  return (
    <>
      <div>
        <h1>Hello from the main page of the app!</h1>
        <p>Here are some examples of links to other pages</p>
        <nav>
          <ul>
            <li>
              <Link to="profile">Profile page</Link>
            </li>
          </ul>
        </nav>
      </div>

      { /* Use for Vitest/React Testing/Jest */ }
      <button type="button" onClick={clickHandler}>
        Click Me
      </button>
      <h1>{heading}</h1>
    </>
  );
};

// RenderName component
const RenderName = (props) => {
  return <div>{props.name}</div>;
};


// Set data types on RenderName props
RenderName.propTypes = {
  name: PropTypes.string.isRequired,
};

RenderName.defaultProps = {
  name: 'Zach',
};


export default App;