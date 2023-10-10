import { useSelector } from 'react-redux';

function Customer() {
  // callback function takes the store. store.customer is the customer reducer. Return any info needed from the callback function
  const customer = useSelector((store) => store.customer.fullName);
  return <h2>👋 Welcome {customer},</h2>;
}

export default Customer;
