import { Box, Spinner, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const Loader = () => {
  return (
    <div>
      <VStack h={'90vh'} justifyContent={'center'}>
        <Box transform={'scale(3)'}>
          <Spinner size={'xl'}/>
        </Box>
        <Text as={'b'} marginTop={'50px'} fontSize={'4xl'}>Loading ...</Text>
      </VStack>
    </div>
  )
}

export default Loader