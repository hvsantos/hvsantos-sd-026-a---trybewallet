import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    const arrTable = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    console.log(expenses);
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
                  >
                    Editar
                  </button>
                  <button
                    type="button"
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
