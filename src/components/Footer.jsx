import { Box, Button, HStack, Heading, Input, Stack, VStack, Text } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { AiOutlineSend, AiFillGithub, AiFillLinkedin} from 'react-icons/ai'
import { BiCodeAlt } from 'react-icons/bi'
import emailjs from '@emailjs/browser'


const serviceId = process.env.REACT_APP_YOUR_SERVICE_ID
const templateId = process.env.REACT_APP_YOUR_TEMPLATE_ID
const publicKey = process.env.REACT_APP_YOUR_PUBLIC_KEY
const faltu = "hello"

const Footer = () => {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(`${serviceId}`, `${templateId}`, form.current, `${publicKey}`)
      .then((result) => {
        console.log(result.text);
        alert("email sent")
      }, (error) => {
        console.log(error.text);
        alert("some error in sending email")
      });
  };


  return (
    <Box bgColor={'blackAlpha.900'} minH={'20'} p={8} color={'white'} borderTop={'2px solid white'}>
      <Stack direction={['column', 'row']}>
        <VStack w={'full'}>
          <form ref={form} onSubmit={sendEmail}>
            <VStack w={'full'} alignItems={'stretch'}>
              <Heading size={'md'}>
                CONTACT US ...
              </Heading>
              <HStack borderBottom={'1px solid white'} p={'1px 0px'}>
                <Input placeholder='enter your email here ...'
                  border={'none'}
                  focusBorderColor="red"
                  outline={'none'}
                  name="message"
                />
                <Button
                  p={0}
                  colorScheme='purple'
                  borderRadius={'0 20px 20px 0'}
                  variant={'ghost'}
                  type="submit"
                >
                  <AiOutlineSend size={20} />
                </Button>
              </HStack>
            </VStack>
          </form>
        </VStack>
        {/* <VStack w={'full'} alignItems={'stretch'}>
                <Heading size={'md'}>
                    CONTACT US ...
                </Heading>
                <HStack borderBottom={'1px solid white'} p={'1px 0px'}>
                    <Input placeholder='enter your email here ...' 
                    border={'none'} 
                    focusBorderColor="red" 
                    outline={'none'} 
                    />
                    <Button 
                        p={0}
                        colorScheme='purple'
                        borderRadius={'0 20px 20px 0'}
                        variant={'ghost'}
                    >
                        <AiOutlineSend size={20}/>
                    </Button>
                </HStack>
            </VStack> */}
        <VStack w={'full'} borderLeft={['none', '2px solid white']}>
          <Heading alignItems={'center'}>TRADE.CRYPTO</Heading>
          <Text>Explore the world of crypto</Text>
        </VStack>
        <VStack w={'full'} borderLeft={['none', '2px solid white']}>
          <Heading size={'md'}>
            Follow Us On...
          </Heading>
          <HStack>
            <Button colorScheme='white' borderRadius={'full'} variant={'ghost'}>
              <a href="https://github.com/divyanshGupta-07" target='blank'><AiFillGithub size={32} /></a>
            </Button>
            <Button colorScheme='white'
              borderRadius={'full'} variant={'ghost'}>
              <a href="https://www.linkedin.com/in/divyansh-gupta-488730228" target='blank'><AiFillLinkedin size={32} /></a>
            </Button>
            <Button colorScheme='white' variant={'ghost'} borderRadius={'full'}>
              <a href="https://auth.geeksforgeeks.org/user/taloktripathi1997/"><BiCodeAlt size={32} /></a>
            </Button>
          </HStack>
        </VStack>
      </Stack>
    </Box>
  )
}

export default Footer