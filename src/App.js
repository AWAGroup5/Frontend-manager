import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Manager from './components/Manager';
import AddRestaurant from './components/AddRestaurant';
import AddProduct from './components/AddProduct';
import Footer from './components/Footer';
import RegisterManager from './components/RegisterManager';
import { useState } from 'react';
import { UserAuthContext } from './Contexts'

const jwtFromStorage = window.localStorage.getItem('appAuthData');


function App() {

  const initialAuthData = {
    jwt: jwtFromStorage,
    login: (newValueForJwt) => {
      const newAuthData = { ...userAuthData,
          jwt: newValueForJwt
        };
      window.localStorage.setItem('appAuthData', newValueForJwt);
      setUserAuthData(newAuthData);
    },
    logout: () => {
      window.localStorage.removeItem('appAuthData');
      setUserAuthData({...initialAuthData});
    }
  };

  const [ userAuthData, setUserAuthData ] = useState({...initialAuthData});


    return(
      <UserAuthContext.Provider value={ userAuthData }>
      <div>
        <UserAuthContext.Consumer>
           { value => value.jwt ? <NavBar  AddRestaurant Managerview logout/> : <NavBar register login />}
        </UserAuthContext.Consumer>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="manReg" element={ <RegisterManager /> } />
          <Route path="restaurant" element={ <Manager /> } />
          <Route path="restaurant/newproduct" element={ <AddProduct /> } />
          <Route path="restaurant/addrestaurant" element={ <AddRestaurant /> } />
        </Routes>
        <Footer />
      </div>
      </UserAuthContext.Provider>
    );
  };


export default App;
