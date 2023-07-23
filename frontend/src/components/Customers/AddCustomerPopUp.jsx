import React, { useState } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { FaUserPlus } from 'react-icons/fa';

const AddCustomerPopup = ({ onAddCustomer }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = () => {
    // Basic validation checks
    if (!email || !firstName || !lastName || !avatar) {
      setFormError('All fields are required');
      return;
    }

    setFormError('');

    const newCustomer = {
      email,
      first_name: firstName,
      last_name: lastName,
      avatar,
    };
    onAddCustomer(newCustomer);
    setEmail('');
    setFirstName('');
    setLastName('');
    setAvatar('');
    onClose();
  };

  return (
    <>
      <Button
        variant={'solid'}
        color="yellow.500"
        leftIcon={<FaUserPlus />}
        ml={2}
        onClick={onOpen}
      >
        Add New Customer
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Customer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required 
            />
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              mt={4}
              required 
            />
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              mt={4}
              required 
            />
            <Input
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="Avatar URL"
              mt={4}
              required 
            />
            {formError && (
              <span style={{ color: 'red', fontSize: '0.875rem' }}>
                {formError}
              </span>
            )}
          </ModalBody>

          <ModalFooter>
            <Button color="yellow.500" onClick={handleSubmit}>
              Add
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddCustomerPopup;
