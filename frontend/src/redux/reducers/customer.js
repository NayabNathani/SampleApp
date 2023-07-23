// customer.js

import { createReducer } from '@reduxjs/toolkit';
import {
  ADD_CUSTOMER_SUCCESS,
  LOAD_INITIAL_CUSTOMERS,
  DELETE_CUSTOMER,
  EDIT_CUSTOMER
} from '../actions/customer';

const initialState = {
  customers: [],
};

export const customerReducer = createReducer(initialState, {
  [ADD_CUSTOMER_SUCCESS]: (state, action) => {
    state.customers.push(action.payload);
    localStorage.setItem('customers', JSON.stringify(state.customers));
  },
  [DELETE_CUSTOMER]: (state, action) => {
    const customerId = action.payload;
    state.customers = state.customers.filter((customer) => customer.id !== customerId);
    localStorage.setItem('customers', JSON.stringify(state.customers));
  },
  [EDIT_CUSTOMER]: (state, action) => {
    const { customerId, updatedCustomer } = action.payload;
    state.customers = state.customers.map((customer) =>
      customer.id === customerId ? { ...customer, ...updatedCustomer } : customer
    );
    localStorage.setItem('customers', JSON.stringify(state.customers));
  },
  [LOAD_INITIAL_CUSTOMERS]: (state, action) => {
    state.customers = action.payload;
  },
});
