import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

const Error = ({msg}) => {
  return (
    <Alert status='error'
     position={'fixed'}
     left={'50%'}
     transform={'translateX(-50%)'}
     width={'50%'}
     top={'50%'}>
      <AlertIcon />
      {
        msg
      }
    </Alert>
  )
}

export default Error