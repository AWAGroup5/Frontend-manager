import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Manager from './components/Manager';
import AddRestaurant from './components/AddRestaurant';
import AddProduct from './components/AddProduct';
import Footer from './components/Footer';
import RegisterManager from './components/RegisterManager';
import { useState, useEffect } from 'react';
import { UserAuthContext } from './Contexts'
//import jwt_decode from "jwt-decode";

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

  useEffect(() => {
    if (jwtFromStorage != null) {
      userAuthData.login(jwtFromStorage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

    return(
      <UserAuthContext.Provider value={ userAuthData }>
      <div>
        <UserAuthContext.Consumer>
           { value => value.jwt ? <NavBar  AddRestaurant Managerview logout/> : <NavBar register login />}
        </UserAuthContext.Consumer>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="manReg" element={ <RegisterManager /> } />
          <Route path="restaurant/:restaurantId" element={ <Manager /> } />
          <Route path="restaurant/:restaurantId/newproduct" element={ <AddProduct /> } />
          <Route path="restaurant/addrestaurant" element={ <AddRestaurant /> } />
        </Routes>
        <Footer />
      </div>
      </UserAuthContext.Provider>
    );
  };


export default App;
