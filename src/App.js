
import './App.css';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cards from './components/Cards';
import CardsDetails from './components/CardsDetails';



function App() {

  return (
    <div className="App">

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Cards />} />
          <Route path='/cart/:id' element={<CardsDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
