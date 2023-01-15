import fetchPqSim from '../../helper/fetchPqSim';
import setIds from '../../helper/setIds';

// Coloque aqui suas actions
const SAVE_USER_EMAIL = 'SAVE_USER_EMAIL';
const SAVE_WALLET_CURRENCY = 'SAVE_WALLET_CURRENCY';
const SAVE_WALLET_EXPENSES = 'SAVE_WALLET_EXPENSES';

export const saveUser = (email) => ({
  type: SAVE_USER_EMAIL,
  payload: email,
});

export const saveCurrency = (func) => {
  fetchPqSim().then((data) => {
    const arrOfObj = Object.entries(data)
      .map(([key, value]) => ({ ...value, id: key }))
      .filter((curren) => curren.id !== 'USDT');
    const dataArr = arrOfObj.map((elem) => elem.id);
    func({
      type: SAVE_WALLET_CURRENCY,
      payload: dataArr,
    });
  });
};

export const saveExpenses = (func, incState, expenses) => {
  const { expenseValue, expenseCurrency, expensePayMethod,
    expenseCategory, expenseDescription } = incState;

  fetchPqSim()
    .then((fetchedValues) => {
      const formatExpense = {
        id: '',
        value: expenseValue,
        currency: expenseCurrency,
        method: expensePayMethod,
        tag: expenseCategory,
        description: expenseDescription,
        exchangeRates: fetchedValues,
      };
      return formatExpense;
    })
    .then((newExpense) => {
      expenses.push(newExpense);
      func({
        type: SAVE_WALLET_EXPENSES,
        payload: setIds(expenses),
      });
    });
};
