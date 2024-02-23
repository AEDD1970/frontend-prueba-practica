
import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import './index.scss';
import ButtonSimple from './Components/Global/Buttons/ButtonSimple';

function App() {
  const [openStore, setOpenStore] = useState(true)
  return (
    <React.Fragment>
      {openStore ? <div className='home'>
        <ButtonSimple handleOnclick={() => setOpenStore(false)}> open store</ButtonSimple>
      </div> :
        <BrowserRouter>
          <main className='main'>
            <NavBar />
            <Routes />
            <Footer />
          </main>
        </BrowserRouter>
      }


    </React.Fragment>


  );
}

export default App;
