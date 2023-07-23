import { configureStore } from '@reduxjs/toolkit';
import { customerReducer  } from './reducers/customer';
import {loadInitialCustomers} from './actions/customer'

const store = configureStore({
  reducer: {
    customer: customerReducer,
  },
});

//load initial customers from local storage
store.dispatch(loadInitialCustomers());

export default store;
