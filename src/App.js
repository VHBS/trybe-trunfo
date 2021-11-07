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
      filterCards: [],
      filterCard: false,
      filterCardRare: 'todas',
    };
    this.checkInputsValues = this.checkInputsValues.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.checkAtributs = this.checkAtributs.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.filterCards = this.filterCards.bind(this);
    // this.testeFiltroRaridade = this.testeFiltroRaridade.bind(this);
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
      // Referencia para utilizar o parametro state: https://pt-br.reactjs.org/docs/react-component.html#setstate.
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
        this.setState({ hasTrunfo: true });
      }
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
    });
  }

  filterCards({ target: { value, id } }) {
    const { savedCards } = this.state;
    if (id === 'filterName') {
      if (value.length > 0) {
        const teste = savedCards.filter((card) => card.cardName.includes(value));
        this.setState({
          filterCard: true,
          filterCards: teste,
        });
      } else {
        this.setState({
          filterCard: false,
          filterCards: savedCards,
        });
      }
    } else if (id === 'filterRare') {
      if (value !== 'todas') {
        const teste = savedCards.filter((card) => card.cardRare === value);
        this.setState({
          filterCard: true,
          filterCards: teste,
        });
      } else {
        this.setState({
          filterCard: false,
          filterCards: savedCards,
        });
      }
    }
  }

  // testeFiltroRaridade({ target: { value } }) {
  //   console.log(value);
  // }

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
    const { savedCards, filterCards, filterCard } = this.state;
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          { ... this.state }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <br />
        <Card { ... this.state } />
        <br />
        <div>
          <h3>Todas as cartas</h3>
          <p>Filtros de busca</p>
          <input
            type="text"
            data-testid="name-filter"
            onChange={ this.filterCards }
            placeholder=" Nome da carta"
            id="filterName"
          />
          <br />
          <select
            data-testid="rare-filter"
            onChange={ this.filterCards }
            id="filterRare"
          >
            <option>todas</option>
            <option>normal</option>
            <option>raro</option>
            <option>muito raro</option>
          </select>
          <br />
          {/* <button type="submit">Buscar</button> */}
        </div>
        { !filterCard ? savedCards.map((card, index) => (
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
          </div>))
          : filterCards.map((card, index) => (
            //
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
            </div>))}
      </div>
    );
  }
}

export default App;
