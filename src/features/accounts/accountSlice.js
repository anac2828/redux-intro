import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
};

// REDUX TOOLKIT
const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      // To allow for the action creator to receive two arguments
      prepare(loanAmount, loanPurpose) {
        return { payload: { loanAmount, loanPurpose } };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.loanAmount;
        state.loanPurpose = action.payload.loanPurpose;
        state.balance += action.payload.loanAmount;
      },
    },
    payLoan(state, action) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = '';
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount, currency) {
  if (currency === 'USD') return { type: 'account/deposit', payload: amount };

  // MIDDLEWARE THUNK
  // return a function (thunk) that will be executed by redux before dispatching anything to the store.
  return async function (dispatch, getState) {
    dispatch({ type: 'account/convertingCurrency' });
    // API call
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );

    const data = await res.json();
    // dispatch
    dispatch({ type: 'account/deposit', payload: data.rates.USD });
  };
}

export default accountSlice.reducer;

// CLASSIC REDUX
// reudcer cannot have side effects
// export default function accountReducer(state = initialState, action) {
//   switch (action.type) {
//     case 'account/deposit':
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case 'account/withdraw':
//       return { ...state, balance: state.balance - action.payload };
//     case 'account/requestLoan':
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//       };
//     case 'account/payLoan':
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: '',
//         balance: state.balance - state.loan,
//       };
//     case 'account/convertingCurrency':
//       return { ...state, isLoading: true };

//     default:
//       return state;
//   }
// }

// // ACTION CREATORS

// export function deposit(amount, currency) {
//   if (currency === 'USD') return { type: 'account/deposit', payload: amount };

//   // MIDDLEWARE THUNK
// return a function (thunk) that will be executed by redux before dispatching anything to the store.
//   return async function (dispatch, getState) {
//     dispatch({ type: 'account/convertingCurrency' });
//     // API call
//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//     );

//     const data = await res.json();
//     // dispatch
//     dispatch({ type: 'account/deposit', payload: data.rates.USD });
//   };
// }
// export function withdraw(amount) {
//   return { type: 'account/withdraw', payload: amount };
// }
// export function requestLoan(amount, purpose) {
//   return {
//     type: 'account/requestLoan',
//     payload: { amount: amount, purpose: purpose },
//   };
// }
// export function payLoan() {
//   return { type: 'account/payLoan' };
// }
