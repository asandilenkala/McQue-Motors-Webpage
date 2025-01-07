import './App.css';
import Nav from  './components/Nav';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import CarList from './components/CarList';
import Profile from './components/Profile';
import About from './components/About';
import RentedCars from './components/RentedCars';
import SaleCarDetails from './components/SaleCarDetails';
import RentCarDetails from './components/RentCarDetails';
import CarListDashboard from './components/CarListDashboard';


import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path='/cars' element={<CarList/>} />
          <Route path='/McQue-Motors-stuffdashboard' element={<Dashboard/>} />
          <Route path='/' element={<Profile/>} />
          <Route path='/purchase/cars/:carId' element={<SaleCarDetails/>} />
          <Route path='/rent/cars/:carId' element={<RentCarDetails/>} />
          <Route path="/about" element={<About />} />
          <Route path="/carlistdashboard" element={<CarListDashboard/>} />
          <Route path="/rentedCars" element={<RentedCars />} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
