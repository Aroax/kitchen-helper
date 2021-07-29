const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {

  render() {
    return (
      <h1>Kitchen Helper is Awesome</h1>
    )
  }
}

ReactDOM.render(
	<App />,
	document.getElementById('app')
)
