import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import EditForm from '../components/EditForm';

class Wallet extends React.Component {
  render() {
    const { editor } = this.props;
    return (
      <div>
        <Header />
        { editor ? <EditForm /> : <WalletForm /> }
        <Table />
      </div>
    );
  }
}

const mapStateToProps = ({ wallet: { editor } }) => ({
  editor,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {}.isRequired;
