import React, { useEffect, useState ,useCallback} from 'react'
import './Carousel.css'
import axios from 'axios'
import { TrendingCoins } from '../../config/api'
import {CryptoState} from "../../CryptoContext"
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'
export function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")
}
function Carousel() {
    const [trending,setTrending]=useState([]);
    const {currency,symbol}=CryptoState();
    const fetchTrendingCoins = useCallback(async () => {
        const { data } = await axios.get(TrendingCoins(currency));
        setTrending(data);
      }, [currency]);
      
    console.log(trending);
    useEffect(() => {
        fetchTrendingCoins();
      }, [fetchTrendingCoins]);
      
    const items=trending.map((coin)=>{
        let profit=coin.price_change_percentage_24h>=0;
        return(
            <Link className='carouselItem' to={`/coins/${coin.id}`}>{/*to move to particular coin while clicking the particular coin*/}
                <img 
                src={coin.image}
                alt={coin.name}
                height="80"
                style={{marginBottom:10}}/>
                <span>
                    {coin.symbol}
                    &nbsp;
                    <span 
                    style={{
                        color:profit>0?"rgb(14,203,129)":"red",
                        fontWeight:500,
                    }}>
                        {profit && '+'}{coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                </span>
            <span style={{fontSize:22,fontWeight:500}}>
                {symbol}{numberWithCommas(coin.current_price.toFixed(2))}
            </span>
            </Link>
        )
    })
    const responsive={
        0:{
            items:2,
        },
        512:{
            items:4,
        }
    }
  return (
    <div className='carousel'>
      <AliceCarousel
      mouseTracking
       infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
      autoPlay items={items}/>
    </div>
  )
}

export default Carousel
