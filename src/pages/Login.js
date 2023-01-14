import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import saveUser from '../redux/actions';

class Login extends React.Component {
  state = {
    inputEmail: '',
    inputPassword: '',
    redirectToWallet: false,
    disableButton: true,
  };

  submitAndRedirect = (event) => {
    event.preventDefault();

    const { dispatch } = this.props;
    const { inputEmail } = this.state;

    dispatch(saveUser(inputEmail));

    this.setState({ redirectToWallet: true });
  };

  handleChanger = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      const { inputEmail, inputPassword } = this.state;
      const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
      const testRegex = regex.test(inputEmail);
      const seis = 6;

      this.setState({ disableButton: !(testRegex && inputPassword.length >= seis) });
    });
  };

  render() {
    const { redirectToWallet, disableButton, inputEmail, inputPassword } = this.state;

    if (redirectToWallet) {
      return <Redirect to="/carteira" />;
    }

    return (
      <div>
        <label htmlFor="inputEmail">
          Email
          <input
            name="inputEmail"
            data-testid="email-input"
            value={ inputEmail }
            onChange={ this.handleChanger }
          />
        </label>

        <label htmlFor="inputPassword">
          Senha
          <input
            name="inputPassword"
            data-testid="password-input"
            value={ inputPassword }
            onChange={ this.handleChanger }
          />
        </label>
        <button
          type="submit"
          onClick={ this.submitAndRedirect }
          disabled={ disableButton }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default connect()(Login);

Login.propTypes = {}.isRequired;
