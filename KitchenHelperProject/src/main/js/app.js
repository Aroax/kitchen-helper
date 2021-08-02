const React = require('react');
const ReactDOM = require('react-dom');
import User from "./components/session";
import theme from "./components/theme";
import { ThemeProvider } from "@material-ui/core";

class App extends React.Component {

  render() {
    return (
      <div className="container">
        <ThemeProvider theme={theme}>
          <User />
        </ThemeProvider>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
