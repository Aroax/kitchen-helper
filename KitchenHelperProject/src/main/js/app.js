const React = require('react');
const ReactDOM = require('react-dom');
import User from "./components/session";

class App extends React.Component {

  render() {
    return (
      <div className="container">
        <h1>Kitchen Helper is Really Awesome</h1>
        <User >
        </User>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
