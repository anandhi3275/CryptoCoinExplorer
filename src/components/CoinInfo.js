import React, { useEffect, useRef, useState ,useCallback} from 'react'
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { HistoricalChart } from '../config/api';
import { CircularProgress, ThemeProvider, createTheme } from '@material-ui/core';
import './CoinInfo.css'
import { Line } from 'react-chartjs-2';
import { chartDays } from '../config/data';
import SelectButton from './SelectButton';
import {
  Chart as chartjs,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';

chartjs.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
);
function CoinInfo({coin}) {
  const [historicalData,setHistoricalData]=useState([]);
  const [days,setDays]=useState(1);
  const chartRef=useRef(null);

  const {currency}=CryptoState();

  const fetchHistoricalData = useCallback(async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricalData(data.prices);
  }, [coin.id, days, currency]);
  

  useEffect(() => {
    fetchHistoricalData();
  }, [fetchHistoricalData]);
  

  useEffect(()=>{
    if(chartRef.current){
      chartRef.current.destroy();
    }
  },[historicalData])
  const darkTheme=createTheme(
    {
      palette:{
        primary:{
          main:'#fff',
        },
        type:'dark'
      },
    }
  )
  return (
    
      <ThemeProvider theme={darkTheme}>
      <div className='container1'>
        {/*chart */}
        
        {
          !historicalData.length?(
            <CircularProgress style={{color:"gold"}}
            size={250}
            thickness={1}/>
          ):(
          
            <Line
            data={{
              labels:historicalData.map((coin)=>{
                let date=new Date(coin[0]);
                let time=date.getHours()>12?
                `${date.getHours()-12}:${date.getMinutes()}PM`:
                `${date.getHours()}:${date.getMinutes()}AM`;
              
              return days===1?time:date.toLocaleDateString();
              }),

              datasets:[{
                data:historicalData.map((coin)=>coin[1]),
                label:`Price (past${days} Days) in ${currency}`,
                borderColor:"#EEBC1D",
                
              },],
            }}
            options={{
              elements:{
                point:{
                  radius:1,
                },
              },
            }}
            />
          )
        }
        <div className='button-container'>
            {chartDays.map((day)=>(
              <SelectButton key={day.value} onClick={()=>setDays(day.value)}
              selected={day.value===days}>
                {day.label}
                </SelectButton>
            ))}
            </div>
        {/*buttons */}
      </div>
      </ThemeProvider>
    
  )
}

export default CoinInfo
