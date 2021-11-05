import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '',
      cardAttr2: '',
      cardAttr3: '',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange({ target: { id, value, type, checked } }) {
    const valor = type === 'checkbox' ? checked : value;
    this.setState({
      [id]: valor,
    });
  }

  render() {
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form onInputChange={ this.onInputChange } { ... this.state } />
        <Card { ... this.state } />
      </div>
    );
  }
}

export default App;
