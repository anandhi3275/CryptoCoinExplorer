import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HeaderComp from './components/HeaderComp';
import HomePage from './pages/HomePage';
import CoinPage from './pages/CoinPage';



function App() {
  
  return (
    <BrowserRouter>
      <div className='App'>
        <HeaderComp/>
        {/*creating routes for 2 pages i.e home page and  */}
        <Routes>
        <Route path='/' Component={HomePage} exact/>
        <Route path='/coins/:id' Component={CoinPage} exact/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
