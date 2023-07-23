import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
} from '@chakra-ui/react';

const EditCustomerPopup = ({ customer, onClose, onSave }) => {
  const [editedCustomer, setEditedCustomer] = useState({
    id: customer.id,
    first_name: customer.first_name,
    last_name: customer.last_name,
    email: customer.email,
    avatar: customer.avatar,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedCustomer);
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Customer</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            name="first_name"
            value={editedCustomer.first_name}
            onChange={handleInputChange}
          />
          <Input
            name="last_name"
            value={editedCustomer.last_name}
            onChange={handleInputChange}
          />
          <Input
            name="email"
            value={editedCustomer.email}
            onChange={handleInputChange}
          />
          <Input
            name="avatar"
            value={editedCustomer.avatar}
            onChange={handleInputChange}
          />
        </ModalBody>
        <ModalFooter>
          <Button color='yellow.500' mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditCustomerPopup;
