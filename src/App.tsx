import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import CalculadoraBasal from "./pages/CalculadoraBasal";
import DietaPage from './pages/Dieta';
import Login from './pages/Login';
import Register from './pages/Cadastro';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< Login/>} />
        <Route path="/calculadora" element={<CalculadoraBasal />} />
        <Route path="/dieta" element={<DietaPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
