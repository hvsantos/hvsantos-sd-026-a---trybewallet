import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    console.log(this.props);
    const { dispatch,
      state: {
        wallet: { currencies, editor, expenses, idToEdit },
      } } = this.props;

    return (
      <div>
        <Header />
        <p>resto da wallet</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ state });

Wallet.propTypes = {}.isRequired;

export default connect(mapStateToProps)(Wallet);
