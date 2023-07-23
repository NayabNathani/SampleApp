import React from 'react';
import { Box, Heading, Text, Image } from '@chakra-ui/react';

const CustomerDetail = ({ customer }) => {
  return (
    <Box
      p={4}
      m={4}
      boxShadow="md"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Image src={customer.avatar} boxSize="150px" mx="auto" borderRadius="full" />
      <Heading mt={4} fontSize="xl" textAlign="center">
        {customer.first_name} {customer.last_name}
      </Heading>
      <Text mt={2} textAlign="center">
        Email: {customer.email}
      </Text>
    </Box>
  );
};

export default CustomerDetail;
