import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme, makeStyles } from '@material-ui/core'
import React from 'react'
import {useNavigate} from 'react-router-dom';
import { CryptoState } from '../CryptoContext';


const useStyles=makeStyles(()=>({
  title:{
    flex:1,
    color:"gold",
    fontFamily:"Montserrat",
    fontWeight:"bold",
    cursor:"pointer",
  }
}));
function HeaderComp() {
  
  const navigate=useNavigate();
  const classes=useStyles();

  const {currency,setCurrency}=CryptoState();
  console.log(currency);

  const darkTheme=createTheme({
    palette:{
      primary:{
        main:"#fff"
      },
      type:"dark",
    },
  })
  return (
  <ThemeProvider theme={darkTheme}>
    <div>
      <AppBar color='transparent' position='static'>
      <Container>{/*makes our header as responsive*/}
        <Toolbar>
          <Typography className={classes.title}
          onClick={()=>navigate('/')}
          variant='h6'>
            Crypto CoinExplorer
          </Typography >
          {/*Select bar  implementation for selecting the currency type*/}
          <Select variant='outlined' style={{
            width:100,
            height:40,
            marginRight:15,
          }}
          value={currency}
          onChange={(e)=>setCurrency(e.target.value)}>
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
          </Select>
        </Toolbar>
      </Container>
      </AppBar>
    </div>
    </ThemeProvider>
  )
}

export default HeaderComp
