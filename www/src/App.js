import './App.css';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import Chart from './component/charts';
import Record from './component/record';
import List from './component/list'
import NotFound from './component/notFound';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/list' element={<List />} ></Route>
          <Route path="/add" element={<Record />}></Route>
          <Route path="/" element={<Chart />}></Route>
          <Route path='*' element={<NotFound />}></Route>

        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
