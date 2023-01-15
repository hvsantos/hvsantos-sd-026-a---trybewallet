import React, { Component } from 'react';
import { connect } from 'react-redux';
import { finalizeEdit } from '../redux/actions';

class EditForm extends Component {
  state = {
    expenseValue: '',
    expenseCurrency: 'USD',
    expensePayMethod: 'Dinheiro',
    expenseCategory: 'Alimentação',
    expenseDescription: '',
    exchangeRates: {},
    id: '',
  };

  async componentDidMount() {
    const { expenses, idToEdit } = this.props;
    const { value, currency, method, tag,
      description, exchangeRates, id } = expenses[idToEdit];
    console.log(expenses[idToEdit]);
    const obj = {
      expenseValue: value,
      expenseCurrency: currency,
      expensePayMethod: method,
      expenseCategory: tag,
      expenseDescription: description,
      exchangeRates,
      id,
    };
    this.setState(obj);
  }

  handleChanger = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch, expenses } = this.props;
    const { expenseValue, expenseCurrency, expensePayMethod,
      expenseCategory, expenseDescription, exchangeRates, id } = this.state;
    const entState = {
      value: expenseValue,
      currency: expenseCurrency,
      method: expensePayMethod,
      tag: expenseCategory,
      description: expenseDescription,
      exchangeRates,
      id,
    };
    const arrChanged = [...expenses];
    arrChanged[id] = entState;
    dispatch(finalizeEdit(arrChanged));
  };

  render() {
    const methodArr = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const categoryArr = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { currencies } = this.props;

    if (!this.state || !currencies) {
      return (
        <div>
          <h1>Loading</h1>
        </div>
      );
    }

    const { expenseValue, expenseCurrency, expensePayMethod,
      expenseCategory, expenseDescription } = this.state;

    return (
      <div>
        teste
        <label htmlFor="expenseValue">
          Valor:
          {' '}
          <input
            id="expenseValue"
            data-testid="value-input"
            onChange={ this.handleChanger }
            value={ expenseValue }
          />
        </label>
        <label htmlFor="expenseCurrency">
          Moeda:
          {' '}
          <select
            id="expenseCurrency"
            data-testid="currency-input"
            onChange={ this.handleChanger }
            value={ expenseCurrency }
          >
            { currencies.map((code, index) => (
              <option key={ `moeda${index}` } value={ code }>{ code }</option>
            )) }
          </select>
        </label>
        <label htmlFor="expensePayMethod">
          Método de pagamento:
          {' '}
          <select
            id="expensePayMethod"
            data-testid="method-input"
            onChange={ this.handleChanger }
            value={ expensePayMethod }
          >
            { methodArr.map((method, index) => (
              <option key={ `method${index}` } value={ method }>{ method }</option>
            ))}
          </select>
        </label>
        <label htmlFor="expenseCategory">
          Categoria:
          {' '}
          <select
            id="expenseCategory"
            data-testid="tag-input"
            onChange={ this.handleChanger }
            value={ expenseCategory }
          >
            { categoryArr.map((category, index) => (
              <option key={ `category${index}` } value={ category }>{ category }</option>
            ))}
          </select>
        </label>
        <label htmlFor="expenseDescription">
          Descrição:
          {' '}
          <input
            id="expenseDescription"
            data-testid="description-input"
            onChange={ this.handleChanger }
            value={ expenseDescription }
          />
        </label>
        <button
          type="submit"
          onClick={ this.handleSubmit }
        >
          Editar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet: { currencies, expenses, idToEdit } }) => ({
  currencies,
  expenses,
  idToEdit,
});

export default connect(mapStateToProps)(EditForm);

EditForm.propTypes = {}.isRequired;
