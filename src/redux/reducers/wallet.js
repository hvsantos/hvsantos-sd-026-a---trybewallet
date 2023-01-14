// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas.
const WALLET_INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = WALLET_INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SAVE_WALLET_CURRENCY':
    return { ...state,
      currencies: action.payload };
  case 'SAVE_WALLET_EXPENSES':
    return { ...state,
      expenses: action.payload };
  case 'SAVE_WALLET_EDIT':
    return { ...state,
      editor: action.payload.editor,
      idToEdit: action.payload.idToEdit,
    };
  default:
    return state;
  }
};

export default wallet;
