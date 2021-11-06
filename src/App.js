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
      isSaveButtonDisabled: true,
      savedCards: [],
    };
    this.checkInputsValues = this.checkInputsValues.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.checkAtributs = this.checkAtributs.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  // Função chamada a cada alteração dos imputs dentro do forms.
  onInputChange({ target: { id, value, type, checked } }) {
    const valor = type === 'checkbox' ? checked : value;
    this.setState({
      [id]: valor,
    }, () => (this.checkInputsValues() && this.checkAtributs()
      ? this.setState({
        isSaveButtonDisabled: false,
      })
      : this.setState({
        isSaveButtonDisabled: true,
      })));
  }

  onSaveButtonClick(event) {
    event.preventDefault();
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
    } = this.state;
    this.setState((state) => ({ savedCards: [...state.savedCards, {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
    }] }), () => this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
    }));
  }

  // Checa se os valores dos 3 atributos estão corretos.
  checkAtributs() {
    const { cardAttr1, cardAttr2, cardAttr3 } = this.state;

    const minIndividualValue = 0;

    const maxIndividualValue = 90;

    const maxSumValue = 210;

    const soma = (Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3))
    <= maxSumValue;

    const valAtributs = minIndividualValue <= cardAttr1
    && minIndividualValue <= cardAttr2
    && minIndividualValue <= cardAttr3
    && cardAttr1 <= maxIndividualValue
    && cardAttr2 <= maxIndividualValue
    && cardAttr3 <= maxIndividualValue;

    return soma && valAtributs;
  }

  // Checa se os inputs Nome, Descrição, Imagem e Raridade não estão vazios.
  checkInputsValues() {
    const { cardName, cardDescription, cardImage, cardRare } = this.state;
    const arrayTest = [cardName, cardDescription, cardImage, cardRare];
    return arrayTest.every((val) => (val.length > 0));
  }

  render() {
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          { ... this.state }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card { ... this.state } testePropsSeila="não sei" />
      </div>
    );
  }
}

export default App;
