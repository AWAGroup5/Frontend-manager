import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Manager from './components/Manager';
import AddRestaurant from './components/AddRestaurant';
import AddProduct from './components/AddProduct';
import RegisterManager from './components/RegisterManager';

class App extends React.Component {
  render() {
    return(
      <div>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="manReg" element={ <RegisterManager /> } />
          <Route path="restaurant" element={ <Manager /> } />
          <Route path="restaurant/newproduct" element={ <AddProduct /> } />
          <Route path="restaurant/addrestaurant" element={ <AddRestaurant /> } />
        </Routes>
      </div>
    );
  };
}

export default App;
