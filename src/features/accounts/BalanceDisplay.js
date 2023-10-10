import { connect } from 'react-redux';

function formatCurrency(value) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

function BalanceDisplay({ balance }) {
  return <div className='balance'>{formatCurrency(balance)}</div>;
}

// BEFORE HOOKS THIS WAS HOW TO CONNECT STORE TO REACT

function mapStateToProps(state) {
  return { balance: state.account.balance };
}

// BalanceDisplay will have access to "balance as a prop"
export default connect(mapStateToProps)(BalanceDisplay);
