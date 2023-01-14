// Esse reducer será responsável por tratar as informações da pessoa usuária
const USER_INITIAL_STATE = {
  email: '',
};

const user = (state = USER_INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SAVE_USER_EMAIL':
    return { ...state,
      email: action.payload };
  default:
    return state;
  }
};

export default user;
