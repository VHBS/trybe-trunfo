import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      savedCards: [],
      hasTrunfo: false,
    };
    this.checkInputsValues = this.checkInputsValues.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.checkAtributs = this.checkAtributs.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
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

  // Função para salvar as cartas em um array.
  onSaveButtonClick(event) {
    event.preventDefault();
    const { cardName, cardDescription, cardAttr1, cardAttr2,
      cardAttr3, cardImage, cardRare, cardTrunfo } = this.state;
    this.setState((state) => ({ savedCards: [...state.savedCards,
      {
        cardName,
        cardDescription,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardImage,
        cardRare,
        cardTrunfo,
      }] }),
    () => {
      if (cardTrunfo) {
        this.setState(
          {
            cardName: '',
            cardDescription: '',
            cardAttr1: '0',
            cardAttr2: '0',
            cardAttr3: '0',
            cardImage: '',
            cardRare: 'normal',
            cardTrunfo: false,
            isSaveButtonDisabled: true,
            hasTrunfo: true,
          },
        );
      } else {
        this.setState(
          {
            cardName: '',
            cardDescription: '',
            cardAttr1: '0',
            cardAttr2: '0',
            cardAttr3: '0',
            cardImage: '',
            cardRare: 'normal',
            cardTrunfo: false,
            isSaveButtonDisabled: true,
          },
        );
      }
    });
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

  // Deleta a carta clicada.
  deleteCard(event) {
    event.preventDefault();
    const { savedCards } = this.state;
    const teste = savedCards.find((_card, index) => Number(index)
    === Number(event.target.value));
    if (teste.cardTrunfo) {
      this.setState({
        savedCards: savedCards.filter((_card, index) => Number(index)
      !== Number(event.target.value)),
        hasTrunfo: false,
      });
    } else {
      this.setState({
        savedCards: savedCards.filter((_card, index) => Number(index)
      !== Number(event.target.value)),
      });
    }
  }

  render() {
    const { savedCards } = this.state;
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          { ... this.state }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card { ... this.state } />
        { savedCards.map((card, index) => (
          <div key={ card.cardName + index }>
            <Card { ... card } />
            <button
              type="submit"
              onClick={ this.deleteCard }
              value={ index }
              data-testid="delete-button"
            >
              Excluir

            </button>
          </div>)) }
      </div>
    );
  }
}

export default App;
