import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DashboardHeader from './components/DashboardHeader';
import Listings from './pages/Listings';
import ListingDetail from './pages/ListingDetail';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} /> 
          <Route path="/signin" element={<SignIn />} /> 
          <Route path="*" element={<NotFound />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listing/:listingId" element={<ListingDetail />} /> 
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;