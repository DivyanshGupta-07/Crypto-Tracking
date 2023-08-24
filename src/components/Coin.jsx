import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { Button, Container, HStack, Heading, Image, RadioGroup, Radio,Text, VStack } from '@chakra-ui/react';
import Loader from './Loader';
import Error from './Error';
import { Link } from 'react-router-dom';

const Coins = () => {

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr")

  const currencySymbol = currency==="inr"?"₹":currency==="eur"?"€":"$";
  const btnsArr = new Array(132).fill(1)

  const changePage = (page)=>{
    setPage(page)
    setLoading(true)
  }

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
        setCoins(data);
        setLoading(false);
      } catch (errorinfetch) {
        setLoading(false)
        setError(true)
      }
    };
    fetchCoin();
  }, [page, currency]);

  if (error) { return <Error msg={'some error in fetching Coins'} />; }

  return <Container maxW={'container.xl'}>
    {
      loading ? <Loader /> : (
        <>
          <RadioGroup onChange={setCurrency} p={8} value={currency}>
            <HStack>
              <Radio value={'inr'}>INR</Radio>
              <Radio value={'usd'}>USD</Radio>
              <Radio value={'eur'}>EUR</Radio>
            </HStack>
          </RadioGroup>

          <HStack wrap={'wrap'} justifyContent={'space-around'}>
            {
              coins.map((i) => (
                <CoinCard
                  key={i.id}
                  id={i.id}
                  name={i.name}
                  img={i.image}
                  price={i.current_price}
                  symbol={i.symbol}
                  currencySymbol={currencySymbol}
                />
              ))
            }
          </HStack>
          <HStack w={'full'} overflow={'auto'} p={8}>
            {
              btnsArr.map((ele,indx)=>(
                <Button bgColor={'blackAlpha.900'} color={'whiteAlpha.900'}
                onClick={()=>{changePage(indx+1)}} key={indx}>
                  {indx+1}
                </Button>
              ))
            }
          </HStack>
        </>
      )
    }
  </Container>
}

const CoinCard = ({ id, name, img, symbol, price, currencySymbol='₹'}) => (
  <Link to={`/coin/${id}`}>
    <VStack w={'52'} shadow={'lg'} p={8} borderRadius={'lg'} m={4} transition={"all 0.3s"} css={{
      "&:hover": {
        transform: "scale(1.1)"
      }
    }}>
      <Image src={img} w={'10'} h={'10'} alt={'exchanges'} />
      <Heading size={'md'} noOfLines={1}>{symbol}</Heading>
      <Text noOfLines={1}>{name}</Text>
      <Text noOfLines={1}>{price? `${currencySymbol}${price}` : "NA"}</Text>
    </VStack>
  </Link>
);


export default Coins