import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Component/Home';
import Nav from './Component/Nav';
import Details from './Component/Details';
import Cart from './Component/Cart'; // Make sure this exists and has a default export

function App() {
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <Nav setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/nav" element={<Nav />} />
        <Route path="/cart" element={<Cart />} /> {/* Add cart route if needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
