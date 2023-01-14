import fetchPqSim from '../../helper/fetchPqSim';

// Coloque aqui suas actions
const SAVE_USER_EMAIL = 'SAVE_USER_EMAIL';
const SAVE_WALLET_CURRENCY = 'SAVE_WALLET_CURRENCY';

export const saveUser = (email) => ({
  type: SAVE_USER_EMAIL,
  payload: email,
});

export const saveCurrency = (func) => {
  fetchPqSim().then((arr) => {
    const dataArr = arr.map((elem) => elem.id);
    func({
      type: SAVE_WALLET_CURRENCY,
      payload: dataArr,
    });
  });
};
