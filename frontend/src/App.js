import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import Inventario from './pages/Inventario/Inventario';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/inventario" element={<Inventario />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;