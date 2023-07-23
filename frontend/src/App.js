import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import Home from './components/Home/Home'
import Customers from './components/Customers/Customers';
import NotFound from './components/Layout/NotFound/NotFound';

function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/customers' element={<Customers />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
