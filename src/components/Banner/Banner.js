import { Container, Typography} from '@material-ui/core'
import React from 'react'
import './Banner.css'
import Carousel from './Carousel'


function Banner() {
    
  return (
    <div className="banner">
      <Container className="bannerContext">
        <div className="tagline">
            <Typography
            variant='h2'
            style={{fontWeight:"bold",
                marginBottom:15,
                fontFamily:"Montserrat",
            }}>
                Crypto CoinExplorer
            </Typography>
            <Typography
            variant='subtitle2'
            style={{
                color:"darkgrey",
                textTransform:"capitalize",
                fontFamily:"Montserrat",
            }}>
                Get all the Information regarding your favorite Crypto Currency
            </Typography>

        </div>
        <Carousel/>
      </Container>
    </div>
  )
}

export default Banner
