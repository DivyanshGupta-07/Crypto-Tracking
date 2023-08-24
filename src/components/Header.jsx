import { Button, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <HStack bgColor={'blackAlpha.900'} p={'4'}
      justifyContent={'flex-end'} width={'full'} borderBottom={'1px solid white'}
    >
      <Button color={'white'} variant={'unstyled'} paddingRight={'8'}>
        <Link to='/'>Home</Link>
      </Button>
      <Button color={'white'} variant={'unstyled'} paddingRight={'8'}>
        <Link to='/exchanges'>Exchanges</Link>
      </Button>
      <Button color={'white'} variant={'unstyled'} paddingRight={'8'}>
        <Link to='/coins'>Coins</Link>
      </Button>
    </HStack>
  )
}

export default Header