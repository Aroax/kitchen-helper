const React = require('react');
const ReactDOM = require('react-dom');
import Pantry from "./components/pantry";

class App extends React.Component {

  render() {
    return (
      <div className="container">
        <h1>Kitchen Helper is Really Awesome</h1>
        <Pantry />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
