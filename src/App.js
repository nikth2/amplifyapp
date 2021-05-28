import logo from './logo.svg';
import './App.css';
import React from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { username: '' };
  }
  
  myChangeHandler = (event) => {
    this.setState({username: event.target.value});
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
    //alert("You are submitting " + this.state.username);
    fetch("http://localhost:3000").then(result => alert(result.status));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload!
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
          <form onSubmit={this.mySubmitHandler}>
            <h1>Hello {this.state.username}</h1>
            <p>Enter your name:</p>
            <input
              type="text" onChange={this.myChangeHandler}
            />
          </form>
        </header>
        <AmplifySignOut />
      </div>
    );
  }
}



export default withAuthenticator(App);
