import './App.css';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import Chart from './component/charts';
import Record from './component/record';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Record />}></Route> */}
          <Route path="/" element={<Chart />}></Route>
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
