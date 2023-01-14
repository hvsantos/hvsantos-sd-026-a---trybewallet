// Coloque aqui suas actions
const SAVE_USER_EMAIL = 'SAVE_USER_EMAIL';

const saveUser = (email) => ({
  type: SAVE_USER_EMAIL,
  payload: email,
});

export default saveUser;
