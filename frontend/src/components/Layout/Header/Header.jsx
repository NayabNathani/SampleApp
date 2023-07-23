import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure, VStack } from '@chakra-ui/react'
import React from 'react'
import {ColorModeSwitcher} from '../../../ColorModeSwitcher'
import { RiLogoutBoxRLine, RiMenu5Fill} from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'


const LinkButton = ({url="/", title='Home',onClose})=>(
    <Link to={url} onClick={onClose}>
        <Button variant={'ghost'}>{title}</Button>
    </Link>
)

const Header = () => {

    const {isOpen, onOpen, onClose} = useDisclosure();
    const dispatch = useDispatch();

  return (
    <>
        <ColorModeSwitcher/>

        <Button 
        onClick={onOpen}
        colorScheme={'yellow'} 
        width='12' height={'12'} 
        rounded='full' 
        position={'fixed'}
        zIndex={'overlay'} 
        top='6' 
        left='6'>
            <RiMenu5Fill/> 
        </Button>

        <Drawer placement='left' isOpen={isOpen} onClose={onClose}>
            <DrawerOverlay backdropFilter={'blur(2px)'}/>
            <DrawerContent>
                <DrawerHeader borderBottomWidth={'1px'} >CustomerConnect</DrawerHeader>
                <DrawerBody>
                    <VStack
                    spacing={'6'}
                    alignItems="flex-start"

                    >
                        <LinkButton onClose={onClose} url="/" title="Home"/>
                        <LinkButton onClose={onClose} url="/customers" title="Customers"/>
                    </VStack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    </>
  )
}

export default Header


