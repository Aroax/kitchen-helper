const React = require('react');
const ReactDOM = require('react-dom');
import Pantry from "./components/pantry";
import User from "./components/user";

class App extends React.Component {

  render() {
    return (
      <div className="container">
        <h1>Kitchen Helper is Really Awesome</h1>
        <Pantry />
        <User />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
