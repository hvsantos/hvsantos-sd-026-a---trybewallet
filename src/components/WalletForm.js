import React, { Component } from 'react';
import { connect } from 'react-redux';

import { saveCurrency, saveExpenses } from '../redux/actions/index';
import initialState from '../helper/initialState';

class WalletForm extends Component {
  state = initialState;

  async componentDidMount() {
    const { dispatch } = this.props;
    await saveCurrency(dispatch);
  }

  handleChanger = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const entState = this.state;
    const { dispatch, expenses } = this.props;

    saveExpenses(dispatch, entState, expenses);
    this.setState(initialState);
  };

  render() {
    const methodArr = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const categoryArr = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { expenseValue, expenseCurrency, expensePayMethod,
      expenseCategory, expenseDescription } = this.state;
    const { currencies } = this.props;

    if (!currencies) {
      return (
        <div>
          <h1>Loading</h1>
        </div>
      );
    }

    return (
      <div>
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
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet: { currencies, expenses } }) => ({
  currencies,
  expenses,
});

export default connect(mapStateToProps)(WalletForm);

WalletForm.propTypes = {}.isRequired;
