import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const {
      user: { email },
      wallet: { expenses },
    } = this.props;

    return (
      <div>
        <h1>TRYBE WALLET</h1>
        <div>
          <h3>
            Email:
            {' '}
            <span data-testid="email-field">
              { email }
            </span>
          </h3>
          <h3>
            Despesa Total:
            {' '}
            <span data-testid="total-field">
              { expenses.length > 0
                ? expenses.reduce((a, b) => {
                  const value = b.value * b.exchangeRates[b.currency].ask;
                  return a + value;
                }, 0).toFixed(2)
                : '0.00' }
            </span>
            {' '}
            <span data-testid="header-currency-field">
              BRL
            </span>
          </h3>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({ user, wallet });

Header.propTypes = {}.isRequired;

export default connect(mapStateToProps)(Header);
