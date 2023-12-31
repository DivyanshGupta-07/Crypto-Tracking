import React from 'react'
import {Line } from 'react-chartjs-2'
import {Chart as chartjs,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    } from 'chart.js'

chartjs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const Chart = ({arr=[], currency, days}) => {
    const prices = []
    const date = []
    for(let i=0;i<arr.length;i++)
    {
        if(days === "24h") date.push(new Date(arr[i][0]).toLocaleTimeString());
        else date.push(new Date(arr[i][0]).toLocaleDateString());
        prices.push(arr[i][1]);
        
    }
  return (
    <Line
        options={{
            responsive:true,
        }}
        data={{
            labels:date,
            datasets:[{
                label:`Price in ${currency}`,
                data:prices,
                borderColor:"rgb(44,130,201)",
                backgroundColor:"rgb(1,1,122)"

            }]
        }}
    />
  )
}

export default Chart