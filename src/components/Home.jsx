import { Box, Image, Text, border } from '@chakra-ui/react'
import React from 'react'
import img from '../assets/pngwing.com.png'
import { motion } from 'framer-motion'

const Home = () => {
  return (
    <Box
      bgColor={'blackAlpha.800'}
      width={'full'}
      height={'100vh'}
    >
      <motion.div style={{
        height:'80vh',
      }} animate={{
        translateY:'30px',
      }} transition={{
        duration:1,
        repeat:Infinity,
        repeatType:'mirror'
      }}>
        <Image w={'full'} h={'60vh'} objectFit={'contain'} src={img} />
      </motion.div>

      <Text mt={'-160px'} w={'full'} textAlign={'center'} fontSize={['2rem','4rem']} fontWeight={'thin'} color={'whiteAlpha.900'}>TRADE.CRYPTO</Text>

    </Box>
  )
}

export default Home