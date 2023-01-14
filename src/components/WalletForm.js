import React, { Component } from 'react';
import { connect } from 'react-redux';

import { saveCurrency } from '../redux/actions/index';

class WalletForm extends Component {
  state = {
    expenseValue: '',
    expenseCurrency: '',
    expensePayMethod: 'Dinheiro',
    expenseCategory: 'Alimentação',
    expenseDescription: '',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    await saveCurrency(dispatch);
    this.setState({ expenseCurrency: 'USD' });
  }

  handleChanger = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  render() {
    const methodArr = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const categoryArr = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { expenseValue, expenseCurrency, expensePayMethod,
      expenseCategory, expenseDescription } = this.state;
    const { currencies } = this.props;
    console.log(currencies);

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
        <button type="submit">
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet: { currencies } }) => ({
  currencies,
});

export default connect(mapStateToProps)(WalletForm);

WalletForm.propTypes = {}.isRequired;
