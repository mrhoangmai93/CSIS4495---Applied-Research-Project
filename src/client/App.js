import React from 'react';
import logo from './logo.svg';
import './scss/_home.scss';
import { Button } from 'react-bootstrap';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="justify-content-center flex-column d-flex">
          <Button>test</Button>
          <Button>test</Button>
          <Button>test</Button>
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
