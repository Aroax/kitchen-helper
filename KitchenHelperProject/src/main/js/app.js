const React = require('react'); 
const ReactDOM = require('react-dom'); 
const client = require('./client'); 

class App extends React.Component { 

	constructor(props) {
		super(props);
		this.state = {users: []};
	}

	componentDidMount() { 
		client({method: 'GET', path: '/users'}).done(response => {
			this.setState({users: response.entity._embedded.users});
		});
	}

	render() { 
		return (
			<UserList users={this.state.users}/>
		)
	}
}



// tag::render[]
ReactDOM.render(
	<App />,
	document.getElementById('react')
)
// end::render[]