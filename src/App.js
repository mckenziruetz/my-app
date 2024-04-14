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
import AddListingForm from './pages/AddListingForm';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import Admin from './pages/Admin';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/signin" element={<SignIn />} /> 
        <Route path="*" element={<NotFound />} />
        <Route
          path="/listings"
          element={
            <ProtectedRoute>
              <Listings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/listings/:listingId"
          element={
            <ProtectedRoute>
              <ListingDetail />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/add-listing" element={<AddListingForm />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={['admin']}>
              <Admin />
            </ProtectedRoute>
          }
        />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;