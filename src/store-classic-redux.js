// REDUX STORE
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import accountReducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/customerSlice';

// Combine reducers into one
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// The store is now setup to use the thunk middleware
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
