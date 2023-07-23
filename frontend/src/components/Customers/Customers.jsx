import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { FaEdit, FaEye } from 'react-icons/fa';
import CustomerDetail from './CustomerDetails';
import AddCustomerPopup from './AddCustomerPopUp';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNewCustomer,
  deleteCustomer,
  loadInitialCustomers,
  editCustomer,
} from '../../redux/actions/customer';
import EditCustomerPopup from './EditCustomerPopUp';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const dispatch = useDispatch();
  const customerState = useSelector(state => state.customer);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = localStorage.getItem('customers');
        if (storedData) {
          setCustomers(JSON.parse(storedData));
        } else {
          const response = await axios.get(
            'https://reqres.in/api/users?page=1'
          );
          const data = response.data.data;
          setCustomers(data);
          localStorage.setItem('customers', JSON.stringify(data));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [setCustomers, customers]);
  //just remove customers from dependency array if u want when u delete all customers from localstorage so it doesnt envoke this.

  useEffect(() => {
    // Load initial customers from local storage only once during mount
    const storedData = localStorage.getItem('customers');
    if (storedData) {
      const initialCustomers = JSON.parse(storedData);
      dispatch(loadInitialCustomers(initialCustomers));
    }
  }, [dispatch]);

  useEffect(() => {
    // Fetch data from Redux state instead of local storage
    setCustomers(customerState.customers);
  }, [customerState.customers]);

  const handleViewDetail = customer => {
    setSelectedCustomer(customer);
  };

  const handleAddCustomer = newCustomer => {
    const highestId = customers.reduce((maxId, customer) => {
      return customer.id > maxId ? customer.id : maxId;
    }, 0);
    newCustomer.id = highestId + 1;
    dispatch(addNewCustomer(newCustomer));
  };

  const handleDeleteCustomer = customerId => {
    dispatch(deleteCustomer(customerId));
  };

  const handleEditCustomer = customer => {
    setEditingCustomer(customer);
    setIsEditPopupOpen(true);
  };

  const handleSaveEditedCustomer = editedCustomer => {
    dispatch(editCustomer(editedCustomer.id, editedCustomer));
    setIsEditPopupOpen(false);
  };

  //Working Function without Redux
  // const handleAddCustomer = newCustomer => {
  //   const customers = JSON.parse(localStorage.getItem('customers')) || [];

  //   const highestId = customers.reduce((maxId, customer) => {
  //     return customer.id > maxId ? customer.id : maxId;
  //   }, 0);

  //   // Set the new customer's ID to one greater than the highest ID
  //   newCustomer.id = highestId + 1;

  //   customers.push(newCustomer);
  //   localStorage.setItem('customers', JSON.stringify(customers));
  //   setCustomers(prevCustomers => [...prevCustomers, newCustomer]);
  // };

  // const deleteCustomer = ()=>{
  //   const customers = JSON.parse(localStorage.getItem('customers'))

  // }

  return (
    <Box minH={'100vh'} pb={['45%', '0']}>
      <Grid
        direction={['column', 'row']}
        minH={'100vh'}
        templateColumns={['1fr', '5fr 1fr']}
      >
        <Box p={['0', '16']} overflowX="auto">
          <Heading
            textTransform={'uppercase'}
            my="16"
            textAlign={['center', 'left']}
            children="Customers"
          />
          <AddCustomerPopup onAddCustomer={handleAddCustomer} />
          <TableContainer w={['100vh', 'full']}>
            <Table variant={'simple'} size="lg">
              <TableCaption>All Available Customers in DataBase</TableCaption>
              <Thead>
                <Tr>
                  <Th>Avatar</Th>
                  <Th>Id</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  {/* <Th>Roll</Th> */}
                  <Th isNumeric>Action</Th>
                  <Th>Detail</Th>
                </Tr>
              </Thead>
              <Tbody>
                {customers.map(item => (
                  <Row
                    key={item.id}
                    item={item}
                    onViewDetail={handleViewDetail}
                    onDeleteCustomer={handleDeleteCustomer}
                    onEditCustomer={handleEditCustomer}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>

        {selectedCustomer && <CustomerDetail customer={selectedCustomer} />}
        {isEditPopupOpen && (
          <EditCustomerPopup
            customer={editingCustomer}
            onClose={() => setIsEditPopupOpen(false)}
            onSave={handleSaveEditedCustomer}
          />
        )}
      </Grid>
    </Box>
  );
};

export default Customers;

function Row({ item, onViewDetail, onDeleteCustomer, onEditCustomer }) {
  const handleDeleteClick = () => {
    onDeleteCustomer(item.id);
  };

  return (
    <Tr>
      <Td>
        <Image src={item.avatar} boxSize="40px" borderRadius="full" />
      </Td>
      <Td>#{item.id}</Td>
      <Td>
        {item.first_name} {item.last_name}
      </Td>
      <Td>{item.email}</Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            variant={'outline'}
            color="yellow.500"
            onClick={() => onEditCustomer(item)}
            rightIcon={<FaEdit />}
            mr={2}
          >
            Edit
          </Button>
          <Button
            color={'yellow.500'}
            onClick={handleDeleteClick}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
      <Td>
        <Button
          variant={'ghost'}
          color="yellow.500"
          leftIcon={<FaEye />}
          ml={2}
          onClick={() => onViewDetail(item)}
        >
          View Detail
        </Button>
      </Td>
    </Tr>
  );
}
