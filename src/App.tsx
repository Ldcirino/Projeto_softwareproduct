import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import CalculadoraBasal from "./pages/CalculadoraBasal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/calculadora" element={<CalculadoraBasal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
