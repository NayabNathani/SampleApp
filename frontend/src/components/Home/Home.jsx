import React from 'react'
import {  Heading, Image, Stack, Text, VStack } from '@chakra-ui/react'
import "./home.css"
// import { Link } from 'react-router-dom';
import vg from '../../assests/images/bg1.png';


const Home = () => {
  return (
    <section className='home'>
        <div className='container'>
            <Stack 
            direction={["column","row"]}
            height="100%"
            justifyContent={["center","flex-end"]}
            alignItems="center"
            spacing={["16","56"]}
            >
                <VStack width={"full"} alignItems={['center','flex-end']} spacing='8'>
                    <Heading children="CustomerConnect" size={'3xl'}/>
                    <Text fontSize={'2xl'} textAlign={['center','left']} children="Bridging the Gap Between You and Your Customers" />
                </VStack>
                <Image className='vector-graphics' boxSize={'lg'} src={vg} objectFit="contain"/>
            </Stack>
        </div>
    </section>
  )
}

export default Home