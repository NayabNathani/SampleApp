export const ADD_CUSTOMER_SUCCESS = 'ADD_CUSTOMER_SUCCESS';
export const ADD_CUSTOMER_FAIL = 'ADD_CUSTOMER_FAIL';
export const LOAD_INITIAL_CUSTOMERS = 'LOAD_INITIAL_CUSTOMERS';
export const DELETE_CUSTOMER = 'DELETE_CUSTOMER';
export const EDIT_CUSTOMER = 'EDIT_CUSTOMER';

export const loadInitialCustomers = (initialCustomers) => {
  return {
    type: LOAD_INITIAL_CUSTOMERS,
    payload: initialCustomers,
  };
};


export const addNewCustomer = (newCustomer) => async (dispatch) => {
  try {
    dispatch({ type: ADD_CUSTOMER_SUCCESS, payload: newCustomer });
  } catch (error) {
    console.log(error)
  }
};

export const deleteCustomer = (customerId) => {
  return {
    type: DELETE_CUSTOMER,
    payload: customerId,
  };
};

export const editCustomer = (customerId, updatedCustomer) => {
  return {
    type: EDIT_CUSTOMER,
    payload: {
      customerId,
      updatedCustomer,
    },
  };
};