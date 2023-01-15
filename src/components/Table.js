import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveAfterDelete } from '../redux/actions';

class Table extends Component {
  handleDelete = (id) => {
    const { dispatch, expenses } = this.props;
    const newArr = [...expenses];
    const testArr = newArr.filter((expens) => expens.id !== id);
    dispatch(saveAfterDelete(testArr));
  };

  render() {
    const { expenses } = this.props;
    const arrTable = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    return (
      <table>
        <thead>
          <tr>
            { arrTable.map((elem) => <th key={ elem }>{elem}</th>) }
          </tr>
        </thead>
        <tbody>
          { expenses.length > 0 && expenses
            .map(({ description, id, tag, method, value, currency, exchangeRates }) => (
              <tr key={ `${description}${id}` }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{Number(value).toFixed(2)}</td>
                <td>{currency}</td>
                <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                <td>{(value * Number(exchangeRates[currency].ask)).toFixed(2)}</td>
                <td>{ exchangeRates[currency].name }</td>
                <td>
                  <button
                    type="button"
                    onClick={ () => {} }
                    data-testid="edit-btn"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={ () => this.handleDelete(id) }
                    data-testid="delete-btn"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            )) }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

export default connect(mapStateToProps)(Table);

Table.propTypes = {}.isRequired;
