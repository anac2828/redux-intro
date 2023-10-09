import { createStore } from 'redux';

const initialState = { balance: 0, loan: 0, loandPurpose: '' };

// reudcer cannot have side effects
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'account/deposit':
      return { ...state, balance: state.balance + action.payload };
    case 'account/withdraw':
      return { ...state, balance: state.balance - action.payload };
    case 'account/requestLoad':
      if (state.loan > 0) return state;
      return { ...state, loan: action.payload };
    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loandPurpose: '',
        balance: state.balance - action.payload,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

store.dispatch({ type: 'account/deposit', payload: 500 });
console.log('test');
