import React, { Component } from 'react';
import { render } from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import Button from './Button'

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        <Button />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
