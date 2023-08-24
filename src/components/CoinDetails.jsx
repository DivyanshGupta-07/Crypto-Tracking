import { Badge, Box, Button, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import './Loader'
import Loader from './Loader';
import { server } from '../index';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Error from './Error';
import Chart from './Chart';

const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)
  const [currency, setCurrency] = useState("inr")
  const [days, setDays] = useState("1y")
  const [chartArray,setChartArray] = useState([])
  const params = useParams()

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const switchChartStats = (key)=>{
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;

      case "7d":
        setDays("7d");
        setLoading(true);
        break;

      case "14d":
        setDays("14d");
        setLoading(true);
        break;

      case "30d":
        setDays("30d");
        setLoading(true);
        break;

      case "60d":
        setDays("60d");
        setLoading(true);
        break;

      case "200d":
        setDays("200d");
        setLoading(true);
        break;

      case "1y":
        setDays("365d");
        setLoading(true);
        break;

      case "max":
        setDays("max");
        setLoading(true);
        break;
    
      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/${params.id}`
        )
        const {data:chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)
        console.log(chartData);
        setCoin(data)
        setLoading(false)
        setChartArray(chartData.prices)
      } catch (error) {
        setLoading(false)
        setError(true)
      }
    }
    fetchCoin()
  }, [currency,days,params.id])

  if (error) { return <Error msg={'some error in fetching Coin detail'} />; }

  return (
    <Container maxW={"container.xl"}>
      {
        loading ? (<Loader />) : (
          <>
            <Box width={'full'}>
              <Chart currency={currencySymbol} arr={chartArray} days={days}/>
            </Box>

            <HStack p={"4"} wrap={'wrap'} margin={'4'}>
              {
                btns.map((i)=>(
                  <Button key={i} onClick={()=>switchChartStats(i)}>{i}</Button>
                ))
              }
            </HStack>

            <RadioGroup value={currency} onChange={setCurrency}>
              <HStack>
                <Radio value={'inr'}>INR</Radio>
                <Radio value={'usd'}>USD</Radio>
                <Radio value={'eur'}>EUR</Radio>
              </HStack>
            </RadioGroup>

            <VStack spacing={4} p={16} alignItems={'flex-start'}>
              <Text fontSize={'small'} alignSelf={'center'} opacity={'0.6'}> Last Updated on {Date(coin.market_data.last_updated).split('G')[0]} </Text>
              <Image src={coin.image.large} w={"16"} h={"16"} objectFit={'contain'} />
              <Stat>
                <StatLabel>{coin.name}</StatLabel>
                <StatNumber>
                  {currencySymbol}
                  {coin.market_data.current_price[currency]}
                </StatNumber>
                <StatHelpText>
                  <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ? "increase" : "decrease"}/>
                  {
                    coin.market_data.price_change_percentage_24h
                  }%
                </StatHelpText>
              </Stat>
              <Badge fontSize={'3xl'} bgColor={'blackAlpha.900'} color={'white'}>
                {
                  `#${coin.market_cap_rank}`
                }
              </Badge>
              <CustomBar 
                current_price = {
                  Math.abs((coin.market_data.price_change_percentage_24h))
                }
                high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
                low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
              />
              <Box w={'full'} p={4}>
                <Item tittle={'Max Supply'} value={coin.market_data.max_supply}/>
                <Item tittle={'Circulating Supply'} value={coin.market_data.circulating_supply}/>
                <Item tittle={'Market Capital'} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}/>
                <Item tittle={'All Time High'} value={`${currencySymbol}${coin.market_data.ath[currency]}`}/>
                <Item tittle={'All Time Low'} value={`${currencySymbol}${coin.market_data.atl[currency]}`}/>
              </Box>
            </VStack>

          </>
        )
      }
    </Container>
  )
}


const Item = ({tittle,value})=>(
  <HStack w={'full'} justifyContent={'space-between'} py={3}>
    <Text letterSpacing={'widest'}>{tittle}</Text>
    <Text>{value}</Text>
  </HStack>
)

const CustomBar = ({current_price,high,low})=>(
  <VStack w={'full'}>
    <Progress value={current_price} colorScheme={'telegram'} w={'full'}/>
    <HStack w={'full'} justifyContent={'space-between'}>
      <Badge children={low} colorScheme={'red'}/>
      <Text fontSize={'sm'}>24H range</Text>
      <Badge children={high} colorScheme={'green'}></Badge>
    </HStack>
  </VStack>
)

export default CoinDetails 